/**
 * AI Lead Scoring Function (Cloudflare Pages Function)
 * POST /functions/ai
 * Body: { message: string, product?: string, quantity?: string, country?: string }
 *
 * Uses OpenAI to score and classify inbound leads.
 * Set OPENAI_API_KEY in Cloudflare Pages environment variables.
 */
export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const { message = '', product = '', quantity = '', country = '' } = body;

  if (!env.OPENAI_API_KEY) {
    return fallbackScore({ message, product, quantity });
  }

  try {
    const prompt = `You are a B2B lead scoring assistant for an industrial connector manufacturer in China.

Analyze this inbound RFQ and return a JSON object with:
- score: number 0-100 (purchase intent)
- stage: "HOT" | "WARM" | "COLD"
- priority: "high" | "medium" | "low"
- summary: one sentence assessment
- suggestedAction: what the sales team should do next

RFQ Details:
- Product: ${product || 'Not specified'}
- Quantity: ${quantity || 'Not specified'}
- Country: ${country || 'Not specified'}
- Message: ${message}

Scoring guide:
- HOT (80-100): specific specs, quantity, timeline, company name
- WARM (50-79): general interest, some details provided
- COLD (0-49): vague, no quantity, information request only

Return ONLY valid JSON, no markdown.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 200,
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const result = JSON.parse(text.replace(/```json|```/g, '').trim());

    return Response.json({ ok: true, ...result });
  } catch (err) {
    return fallbackScore({ message, product, quantity });
  }
}

function fallbackScore({ message, product, quantity }) {
  let score = 40;
  const m = (message + product + quantity).toLowerCase();

  if (m.includes('urgent') || m.includes('asap')) score += 25;
  if (m.includes('price') || m.includes('quote') || m.includes('rfq')) score += 15;
  if (/\d{3,}/.test(quantity)) score += 20;
  if (m.includes('ip67') || m.includes('ip68') || m.includes('m12') || m.includes('m8')) score += 10;

  score = Math.min(score, 100);
  const stage = score >= 80 ? 'HOT' : score >= 50 ? 'WARM' : 'COLD';

  return Response.json({
    ok: true, score, stage,
    priority: stage === 'HOT' ? 'high' : stage === 'WARM' ? 'medium' : 'low',
    summary: 'Scored by fallback heuristics.',
    suggestedAction: stage === 'HOT' ? 'Call within 2 hours' : 'Respond by email within 24 hours',
  });
}
