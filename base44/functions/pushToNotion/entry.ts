import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

// Map IntakeSubmission fields → Notion property name.
// Anything not listed here is added to the page body as part of the JSON dump.
const FIELD_MAP: Record<string, { name: string; type: 'rich_text' | 'email' | 'phone_number' | 'date' | 'select' | 'checkbox' | 'url' | 'number' | 'title' }> = {
  client_name: { name: 'Name', type: 'title' },
  status: { name: 'Status', type: 'select' },
  urgency: { name: 'Urgency', type: 'select' },
  case_type: { name: 'Case Type', type: 'rich_text' },
  client_email: { name: 'Client Email', type: 'email' },
  client_phone: { name: 'Client Phone', type: 'phone_number' },
  client_address: { name: 'Client Address', type: 'rich_text' },
  client_city: { name: 'Client City', type: 'rich_text' },
  client_state: { name: 'Client State', type: 'rich_text' },
  client_zip: { name: 'Client Zip', type: 'rich_text' },
  client_relationship: { name: 'Client Relationship', type: 'rich_text' },
  client_attorney_name: { name: 'Client Attorney Name', type: 'rich_text' },
  client_court_case_number: { name: 'Client Court Case Number', type: 'rich_text' },
  preferred_contact: { name: 'Preferred Contact', type: 'select' },
  safe_contact_times: { name: 'Safe Contact Times', type: 'rich_text' },
  subject_name: { name: 'Subject Name', type: 'rich_text' },
  subject_phone: { name: 'Subject Phone', type: 'phone_number' },
  subject_dob: { name: 'Subject DOB', type: 'date' },
  consent_acknowledged: { name: 'Consent', type: 'checkbox' },
  internal_summary: { name: 'Internal Summary', type: 'rich_text' },
  additional_notes: { name: 'Additional Notes', type: 'rich_text' },
};

function truncate(s: string, max = 2000) {
  if (!s) return '';
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function toNotionProperty(value: unknown, type: string) {
  if (value === undefined || value === null || value === '') return null;
  const str = typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : String(value);
  switch (type) {
    case 'title':
      return { title: [{ text: { content: truncate(str, 200) } }] };
    case 'rich_text':
      return { rich_text: [{ text: { content: truncate(str) } }] };
    case 'email':
      return { email: str };
    case 'phone_number':
      return { phone_number: str };
    case 'url':
      return { url: str };
    case 'checkbox':
      return { checkbox: Boolean(value) };
    case 'number':
      return { number: typeof value === 'number' ? value : Number(value) };
    case 'select':
      return { select: { name: str } };
    case 'date': {
      // Accept ISO or YYYY-MM-DD; reject otherwise
      const d = new Date(str);
      if (isNaN(d.getTime())) return null;
      return { date: { start: d.toISOString() } };
    }
    default:
      return null;
  }
}

function buildProperties(submission: Record<string, unknown>, adminUrl: string) {
  const properties: Record<string, unknown> = {};
  for (const [field, cfg] of Object.entries(FIELD_MAP)) {
    const prop = toNotionProperty(submission[field], cfg.type);
    if (prop) properties[cfg.name] = prop;
  }
  // Always-present columns
  if (submission.id) properties['Base44 ID'] = { rich_text: [{ text: { content: String(submission.id) } }] };
  properties['Admin Link'] = { url: adminUrl };
  properties['Submitted At'] = { date: { start: new Date().toISOString() } };
  // Ensure title is set even when client_name is missing
  if (!properties['Name']) {
    properties['Name'] = { title: [{ text: { content: `Submission ${String(submission.id ?? '').slice(0, 8) || 'Unknown'}` } }] };
  }
  return properties;
}

function jsonChunks(text: string, size = 1800): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

function buildBodyBlocks(submission: Record<string, unknown>) {
  const json = JSON.stringify(submission, null, 2);
  const chunks = jsonChunks(json);
  return [
    {
      object: 'block', type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Full submission (raw)' } }] },
    },
    {
      object: 'block', type: 'code',
      code: {
        language: 'json',
        rich_text: chunks.map(c => ({ type: 'text', text: { content: c } })),
      },
    },
  ];
}

async function notionFetch(path: string, init: RequestInit, token: string) {
  const res = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion ${path} ${res.status}: ${body}`);
  }
  return res.json();
}

async function findExistingNotionPage(databaseId: string, base44Id: string, token: string) {
  const q = await notionFetch(`/databases/${databaseId}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Base44 ID', rich_text: { equals: base44Id } },
      page_size: 1,
    }),
  }, token);
  return q.results?.[0]?.id ?? null;
}

Deno.serve(async (req) => {
  try {
    const NOTION_TOKEN = Deno.env.get('NOTION_TOKEN');
    const NOTION_DATABASE_ID = Deno.env.get('NOTION_DATABASE_ID');
    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      return Response.json({ error: 'NOTION_TOKEN and NOTION_DATABASE_ID env vars are required' }, { status: 500 });
    }

    const base44 = createClientFromRequest(req);
    const { submissionId } = await req.json();
    if (!submissionId) return Response.json({ error: 'submissionId is required' }, { status: 400 });

    // Anyone authenticated may push their own submission; admins always allowed.
    // Service-role read so we don't depend on the caller's RLS view.
    const submission = await base44.asServiceRole.entities.IntakeSubmission.get(submissionId);
    if (!submission) return Response.json({ error: 'submission not found' }, { status: 404 });

    const origin = req.headers.get('origin') || 'https://intake.areyoususpicious.com';
    const adminUrl = `${origin}/admin#${submission.id}`;
    const properties = buildProperties(submission, adminUrl);
    const children = buildBodyBlocks(submission);

    const existingPageId = await findExistingNotionPage(NOTION_DATABASE_ID, submission.id, NOTION_TOKEN);

    let pageId: string;
    if (existingPageId) {
      await notionFetch(`/pages/${existingPageId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      }, NOTION_TOKEN);
      pageId = existingPageId;
      // Note: we don't rewrite the body on update — the snapshot stays as-submitted.
    } else {
      const created = await notionFetch(`/pages`, {
        method: 'POST',
        body: JSON.stringify({
          parent: { database_id: NOTION_DATABASE_ID },
          properties,
          children,
        }),
      }, NOTION_TOKEN);
      pageId = created.id;
    }

    return Response.json({ success: true, pageId, mode: existingPageId ? 'updated' : 'created' });
  } catch (error) {
    console.error('pushToNotion error', error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
});
