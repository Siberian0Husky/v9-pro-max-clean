// app/sitemap.xml/route.ts — Auto-generated XML sitemap for SEO
export const dynamic = 'force-static';

const BASE_URL = 'https://globnexis.com';

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/rfq', priority: '0.9', changefreq: 'monthly' },
];

const seoSlugs = [
  'm12-connector-supplier', 'm12-connector-factory-china', 'm12-connector-wholesale-price',
  'm8-connector-supplier', 'm8-connector-factory-china', 'm8-connector-wholesale-price',
  'industrial-plug-supplier', 'industrial-plug-factory-china', 'industrial-plug-wholesale-price',
  'automation-cable-supplier', 'automation-cable-factory-china', 'automation-cable-wholesale-price',
];

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    ...staticPages.map(p => `
  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
    ...seoSlugs.map(slug => `
  <url>
    <loc>${BASE_URL}/products/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
