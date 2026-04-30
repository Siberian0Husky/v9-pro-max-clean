/**
 * Google Ads Optimizer (Cloudflare Pages Function)
 * POST /functions/ads_optimizer
 *
 * Analyzes ad performance metrics and returns optimization recommendations.
 * Optionally uses OpenAI to generate richer insights.
 *
 * Required env vars:
 *   GOOGLE_ADS_KEY   — Google Ads API developer token
 *   OPENAI_API_KEY   — (optional) for AI-powered recommendations
 *
 * Body: {
 *   campaignId?: string,
 *   campaignName?: string,
 *   impressions: number,
 *   clicks: number,
 *   cost: number,      // USD
 *   conversions: number,
 *   revenue?: number,  // USD
 *   ctr?: number,      // override calculated CTR
 *   roas?: number,     // override calculated ROAS
 * }
 */
export async function onRequestPost({ request, env }) {
  const metrics = await request.json();

  const {
    campaignId = 'unknown',
    campaignName = 'Campaign',
    impressions = 0,
    clicks = 0,
    cost = 0,
    conversions = 0,
    revenue = 0,
  } = metrics;

  // Calculate core metrics
  const ctr  = metrics.ctr  ?? (impressions > 0 ? (clicks / impressions) * 100 : 0);
  const cpc  = clicks > 0 ? cost / clicks : 0;
  const cpa  = conversions > 0 ? cost / conversions : null;
  const roas = metrics.roas ?? (cost > 0 && revenue > 0 ? revenue / cost : null);
  const convRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

  // --- Rule-based recommendations ---
  const actions = [];
  let budgetMultiplier = 1.0;
  let status = 'HOLD';

  // CTR rules
  if (ctr < 1.0) {
    actions.push({ type: 'AD_COPY', priority: 'HIGH', reason: `CTR ${ctr.toFixed(2)}% is below 1% threshold`, suggestion: 'Rewrite ad headlines with stronger value proposition (factory-direct, ISO 9001, fast sampling)' });
    status = 'OPTIMIZE';
  } else if (ctr > 4.0) {
    actions.push({ type: 'BUDGET', priority: 'MEDIUM', reason: `High CTR ${ctr.toFixed(2)}% signals strong relevance`, suggestion: 'Consider increasing budget to capture more traffic' });
  }

  // ROAS rules
  if (roas !== null) {
    if (roas > 4.0) {
      budgetMultiplier = 1.3;
      status = 'SCALE';
      actions.push({ type: 'BUDGET', priority: 'HIGH', reason: `Excellent ROAS ${roas.toFixed(2)}x`, suggestion: `Scale budget by 30% (×${budgetMultiplier})` });
    } else if (roas < 1.5) {
      budgetMultiplier = 0.5;
      status = 'PAUSE';
      actions.push({ type: 'BUDGET', priority: 'HIGH', reason: `ROAS ${roas.toFixed(2)}x below break-even`, suggestion: 'Pause campaign or reduce budget by 50% immediately' });
    } else if (roas < 2.5) {
      status = 'OPTIMIZE';
      actions.push({ type: 'TARGETING', priority: 'MEDIUM', reason: `ROAS ${roas.toFixed(2)}x is marginal`, suggestion: 'Tighten audience targeting — focus on engineers & procurement managers in DE/US/JP' });
    }
  }

  // CPA rules
  if (cpa !== null && cpa > 80) {
    actions.push({ type: 'LANDING_PAGE', priority: 'MEDIUM', reason: `High CPA $${cpa.toFixed(2)}`, suggestion: 'A/B test landing page — ensure RFQ form is above the fold' });
  }

  // Conversion rate rules
  if (convRate < 1.5 && clicks > 100) {
    actions.push({ type: 'LANDING_PAGE', priority: 'HIGH', reason: `Low conversion rate ${convRate.toFixed(2)}%`, suggestion: 'Add social proof (client logos, certifications) and a stronger CTA above the fold' });
    status = status === 'HOLD' ? 'OPTIMIZE' : status;
  }

  if (actions.length === 0) {
    actions.push({ type: 'HOLD', priority: 'LOW', reason: 'All metrics within acceptable range', suggestion: 'Monitor for 7 more days before adjustments' });
  }

  // --- Optional: AI-enhanced analysis ---
  let aiInsight = null;
  if (env.OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 200,
          temperature: 0.3,
          messages: [{
            role: 'user',
            content: `You are a Google Ads expert for a Chinese industrial connector B2B exporter. In 2-3 sentences, give a specific insight for this campaign:
Campaign: ${campaignName}, CTR: ${ctr.toFixed(2)}%, CPC: $${cpc.toFixed(2)}, ROAS: ${roas?.toFixed(2) ?? 'N/A'}, Conv rate: ${convRate.toFixed(2)}%, Status: ${status}.
Focus on actionable tactics for reaching procurement managers and engineers globally.`,
          }],
        }),
      });
      const data = await res.json();
      aiInsight = data.choices?.[0]?.message?.content?.trim() ?? null;
    } catch (_) { /* non-critical */ }
  }

  return Response.json({
    ok: true,
    campaignId,
    campaignName,
    status,
    budgetMultiplier,
    metrics: { ctr: +ctr.toFixed(3), cpc: +cpc.toFixed(2), cpa: cpa ? +cpa.toFixed(2) : null, roas: roas ? +roas.toFixed(2) : null, convRate: +convRate.toFixed(2) },
    actions,
    aiInsight,
    analyzedAt: new Date().toISOString(),
  });
}
