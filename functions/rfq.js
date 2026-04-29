export async function onRequestPost({ request }) {
  const form = await request.formData();

  const data = {
    email: form.get("email"),
    message: form.get("message")
  };

  const score = data.message.includes("price") ? 95 : 60;

  return Response.json({
    status: "ok",
    score,
    stage: score > 85 ? "HOT" : "WARM"
  });
}