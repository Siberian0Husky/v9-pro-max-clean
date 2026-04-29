export async function onRequestPost({ request }) {
  const metrics = await request.json();

  if(metrics.ctr < 1.2){
    return Response.json({ action: "pause_ad" });
  }

  if(metrics.roas > 3){
    return Response.json({ action: "scale_budget" });
  }

  return Response.json({ action: "hold" });
}