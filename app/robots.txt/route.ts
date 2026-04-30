export const dynamic = 'force-static';

export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /functions/

Sitemap: https://globnexis.com/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
