export async function onRequestPost({ request }) {
  const { message } = await request.json();

  let score = 50;
  if(message.includes("urgent")) score = 95;
  if(message.includes("price")) score += 20;

  return Response.json({
    score,
    reply: "Auto quotation generated",
    stage: score > 85 ? "HOT" : "WARM"
  });
}