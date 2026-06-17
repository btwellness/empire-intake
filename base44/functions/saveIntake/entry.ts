import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { submissionId, data } = await req.json();

    let result;
    if (submissionId) {
      result = await base44.asServiceRole.entities.IntakeSubmission.update(submissionId, data);
    } else {
      result = await base44.asServiceRole.entities.IntakeSubmission.create(data);
    }

    return Response.json({ id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});