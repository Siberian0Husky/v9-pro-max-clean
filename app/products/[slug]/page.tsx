import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const seoProducts = [
  { slug: 'm12-connector-supplier',        title: 'M12 Connector Supplier',              product: 'M12 Connector', keyword: 'M12 connector supplier', desc: 'Factory-direct M12 connector supplier from China. A/B/D/X coded, IP67/IP68, 3–17 pin. ISO 9001 certified.' },
  { slug: 'm12-connector-factory-china',   title: 'M12 Connector Factory China',         product: 'M12 Connector', keyword: 'M12 connector factory China', desc: 'GlobNexis is a vertically integrated M12 connector factory in Shenzhen, China. OEM/ODM, low MOQ.' },
  { slug: 'm12-connector-wholesale-price', title: 'M12 Connector Wholesale Price',        product: 'M12 Connector', keyword: 'M12 connector wholesale price', desc: 'Get wholesale pricing on M12 connectors direct from our Shenzhen factory. Volume discounts available.' },
  { slug: 'm8-connector-supplier',         title: 'M8 Connector Supplier',               product: 'M8 Connector', keyword: 'M8 connector supplier', desc: 'M8 connector supplier with IP67 protection, 3–8 pin. Compact design for sensors and actuators.' },
  { slug: 'm8-connector-factory-china',    title: 'M8 Connector Factory China',          product: 'M8 Connector', keyword: 'M8 connector factory China', desc: 'China-based M8 connector factory. PROFIBUS and DeviceNet compatible. 500 pcs MOQ.' },
  { slug: 'm8-connector-wholesale-price',  title: 'M8 Connector Wholesale Price',        product: 'M8 Connector', keyword: 'M8 connector wholesale price', desc: 'Wholesale M8 connectors from factory. Competitive pricing, fast sampling, global shipping.' },
  { slug: 'industrial-plug-supplier',      title: 'Industrial Plug Supplier',            product: 'Industrial Plug', keyword: 'industrial plug supplier', desc: 'CEE industrial plug and socket supplier. 16A–125A, IP44/IP67. IEC 60309 certified.' },
  { slug: 'industrial-plug-factory-china', title: 'Industrial Plug Factory China',       product: 'Industrial Plug', keyword: 'industrial plug factory China', desc: 'Source industrial plugs direct from our Shenzhen factory. Heavy-duty polyamide housing, global shipping.' },
  { slug: 'industrial-plug-wholesale-price','title': 'Industrial Plug Wholesale Price',  product: 'Industrial Plug', keyword: 'industrial plug wholesale price', desc: 'Wholesale industrial plugs at factory prices. CEE standard, 2P+E to 3P+N+E configurations.' },
  { slug: 'automation-cable-supplier',     title: 'Automation Cable Supplier',           product: 'Automation Cable', keyword: 'automation cable supplier', desc: 'Automation cable supplier from China. PUR/PVC, drag chain rated, 10M flex cycles.' },
  { slug: 'automation-cable-factory-china','title': 'Automation Cable Factory China',   product: 'Automation Cable', keyword: 'automation cable factory China', desc: 'Shenzhen automation cable factory. Robot arm and drag chain cables. Custom OEM available.' },
  { slug: 'automation-cable-wholesale-price','title': 'Automation Cable Wholesale Price',product: 'Automation Cable', keyword: 'automation cable wholesale price', desc: 'Wholesale automation cables at factory-direct pricing. Custom lengths and gauges accepted.' },
];

export function generateStaticParams() {
  return seoProducts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = seoProducts.find(x => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} | GlobNexis — Industrial Connector Manufacturer`,
    description: p.desc,
    keywords: `${p.keyword}, China manufacturer, factory direct, ISO 9001`,
  };
}

export default function SeoPage({ params }: { params: { slug: string } }) {
  const p = seoProducts.find(x => x.slug === params.slug);
  if (!p) notFound();

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 32, paddingRight: 32, borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// {p.keyword.toUpperCase()}</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--white)', lineHeight: 0.9, marginBottom: 24 }}>{p.title}</h1>
          <p style={{ color: 'var(--text2)', fontSize: 17, maxWidth: 600, lineHeight: 1.7 }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/rfq" style={{ background: 'var(--accent)', color: '#000', padding: '16px 36px', fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.08em' }}>GET FACTORY PRICE</Link>
            <Link href="/products" style={{ border: '1px solid var(--border2)', color: 'var(--text)', padding: '16px 36px', fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.08em' }}>VIEW FULL CATALOG</Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '64px auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--border)' }}>
        {[['Factory Direct', 'No trading companies. Buy direct from our Shenzhen production facility.'], ['ISO 9001 Certified', '100% electrical test before shipment. Consistent quality at scale.'], ['Fast RFQ', 'Send your specs. Receive a detailed quotation within 24 hours.']].map(([title, desc]) => (
          <div key={title} style={{ background: 'var(--bg)', padding: '40px 32px' }}>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{title}</h2>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto 80px', padding: '0 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 56, color: 'var(--white)', marginBottom: 16 }}>READY TO ORDER?</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 16 }}>Tell us your specs and quantity. We respond with a factory-direct quote in 24 hours.</p>
        <Link href="/rfq" style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '18px 48px', fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.08em' }}>REQUEST FREE QUOTE</Link>
      </section>
    </>
  );
}
