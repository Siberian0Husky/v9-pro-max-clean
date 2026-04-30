/**
 * RFQ Handler (Cloudflare Pages Function)
 * POST /functions/rfq
 *
 * 1. Parses the RFQ submission
 * 2. Calls the AI scorer to classify the lead
 * 3. Sends notification email via SendGrid
 * 4. Returns confirmation JSON
 *
 * Required env vars (set in Cloudflare Pages dashboard):
 *   SENDGRID_API_KEY   — SendGrid API key
 *   NOTIFY_EMAIL       — where to receive RFQ notifications (e.g. sales@globnexis.com)
 *   OPENAI_API_KEY     — (optional) enables AI lead scoring
 */
export async function onRequestPost({ request, env }) {
  let body;
  const contentType = request.headers.get('content-type') || '';

  // Accept both JSON and form submissions
  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const fd = await request.formData();
    body = Object.fromEntries(fd.entries());
  }

  const { name, company, email, phone, country, product, quantity, message } = body;

  // Validate required fields
  if (!name || !email || !message) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  // --- Step 1: AI Lead Scoring ---
  let score = 50, stage = 'WARM', suggestedAction = 'Follow up within 24 hours';

  try {
    if (env.OPENAI_API_KEY) {
      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 150,
          temperature: 0.1,
          messages: [{
            role: 'user',
            content: `Score this B2B industrial connector RFQ 0–100. Return JSON only: {score, stage, suggestedAction}
Stage: HOT(80-100)=specific specs+qty+timeline, WARM(50-79)=some detail, COLD(0-49)=vague.
Product: ${product}, Qty: ${quantity}, Country: ${country}, Message: ${message}`,
          }],
        }),
      });
      const aiData = await aiRes.json();
      const parsed = JSON.parse(aiData.choices?.[0]?.message?.content?.replace(/```json|```/g, '') || '{}');
      score = parsed.score ?? score;
      stage = parsed.stage ?? stage;
      suggestedAction = parsed.suggestedAction ?? suggestedAction;
    } else {
      // Heuristic fallback
      const m = (message + product + quantity).toLowerCase();
      if (/\d{3,}/.test(quantity || '')) score += 20;
      if (m.includes('urgent') || m.includes('asap')) score += 20;
      if (m.includes('ip67') || m.includes('ip68') || m.includes('pin')) score += 10;
      score = Math.min(score, 100);
      stage = score >= 80 ? 'HOT' : score >= 50 ? 'WARM' : 'COLD';
    }
  } catch (_) { /* scoring is non-critical, continue */ }

  // --- Step 2: Send Email via SendGrid ---
  const stageColor = { HOT: '#ff6b35', WARM: '#c8ff00', COLD: '#888888' }[stage] || '#888';
  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a08;color:#e8e8e0;padding:32px;border-radius:4px;">
      <div style="border-bottom:2px solid ${stageColor};padding-bottom:16px;margin-bottom:24px;">
        <h1 style="font-size:28px;margin:0;color:#fff;">New RFQ — <span style="color:${stageColor}">${stage}</span></h1>
        <div style="font-size:13px;color:#888;margin-top:4px;">Lead Score: ${score}/100 · ${suggestedAction}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${[['Name', name], ['Company', company || '—'], ['Email', email], ['Phone', phone || '—'], ['Country', country || '—'], ['Product', product || '—'], ['Quantity', quantity || '—']].map(([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2a2a25;color:#888;font-size:13px;width:35%">${k}</td>
          <td style="padding:10px 0;border-bottom:1px solid #2a2a25;color:#e8e8e0;font-size:14px">${v}</td>
        </tr>`).join('')}
      </table>
      <div style="margin-top:24px;padding:20px;background:#1a1a17;border-left:3px solid ${stageColor};">
        <div style="font-size:11px;color:#888;letter-spacing:0.1em;margin-bottom:8px;">MESSAGE</div>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#e8e8e0;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <div style="margin-top:24px;font-size:12px;color:#555;">
        Submitted via GlobNexis RFQ System · ${new Date().toUTCString()}
      </div>
    </div>`;

  if (env.SENDGRID_API_KEY && env.NOTIFY_EMAIL) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.SENDGRID_API_KEY}` },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: env.NOTIFY_EMAIL }] }],
          from: { email: 'noreply@globnexis.com', name: 'GlobNexis RFQ' },
          reply_to: { email, name },
          subject: `[${stage}] RFQ: ${product || 'Inquiry'} — ${company || name} (${country || 'Unknown'})`,
          content: [{ type: 'text/html', value: emailHtml }],
        }),
      });
    } catch (_) { /* email failure is non-critical */ }
  }

  return Response.json({ ok: true, score, stage, message: 'RFQ received. We will respond within 24 hours.' });
}
