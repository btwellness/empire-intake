import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Allow both scheduled (no user) and admin-triggered calls
    let user = null;
    try { user = await base44.auth.me(); } catch (_) {}
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const all = await base44.asServiceRole.entities.IntakeSubmission.list('-created_date', 500);
    const toDelete = all.filter(s => {
      if (!s.deleted_at) return false;
      return new Date(s.deleted_at) < thirtyDaysAgo;
    });

    let deleted = 0;
    for (const sub of toDelete) {
      await base44.asServiceRole.entities.IntakeSubmission.delete(sub.id);
      deleted++;
    }

    return Response.json({ success: true, deleted, checked: all.filter(s => s.deleted_at).length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});