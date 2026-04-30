import Link from 'next/link';

const stats = [
  { value: '16+', label: 'Years Manufacturing' },
  { value: '10K+', label: 'Global Clients' },
  { value: '60+', label: 'Countries Served' },
  { value: '2M+', label: 'Units / Month' },
];

const products = [
  { code: 'M12', name: 'M12 Connector', desc: 'A/B/D/X coded, 3–17 pin. IP67/IP68. Rated for industrial automation, sensors and field buses.', tags: ['3-17 Pin', 'IP67/68', 'PUR/PVC Cable'] },
  { code: 'M8', name: 'M8 Connector', desc: '3/4/6/8 pin configurations. Compact design for tight spaces. PROFIBUS and DeviceNet compatible.', tags: ['3-8 Pin', 'IP67', 'Field Bus'] },
  { code: 'PLG', name: 'Industrial Plug', desc: 'Heavy-duty CEE industrial plugs and sockets. 16A–125A, 3–5 pole. IP44/IP67 protection.', tags: ['16A–125A', 'IP44/67', 'CEE Standard'] },
  { code: 'CBL', name: 'Automation Cable', desc: 'Flexible PUR/PVC cables for robotic arms and drag chains. Oil-resistant, torsion-rated.', tags: ['PUR/PVC', 'Drag Chain', 'Oil Resistant'] },
];

const clients = ['SIEMENS', 'ABB', 'FANUC', 'KUKA', 'BECKHOFF', 'PHOENIX', 'WAGO', 'TURCK'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 32px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(200,255,0,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 100, left: 32, zIndex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.15em' }}>SHENZHEN, CHINA — EST. 2008</div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border2)', padding: '6px 14px', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 2s ease infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text2)', fontFamily: 'JetBrains Mono, monospace' }}>FACTORY DIRECT · ISO 9001 CERTIFIED</span>
          </div>
          <h1 style={{ fontSize: 'clamp(64px, 11vw, 160px)', color: 'var(--white)', marginBottom: 8, lineHeight: 0.92, fontFamily: 'Bebas Neue', letterSpacing: '0.04em' }}>
            INDUSTRIAL<br /><span style={{ color: 'var(--accent)' }}>CONNECTORS</span><br />FROM CHINA
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginTop: 40 }}>
            <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 480, lineHeight: 1.6, fontWeight: 300 }}>Factory-direct M12, M8 connectors, industrial plugs and automation cables. Trusted by 10,000+ engineers across 60 countries.</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/rfq" style={{ background: 'var(--accent)', color: '#000', padding: '16px 36px', fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.08em' }}>REQUEST QUOTE</Link>
              <Link href="/products" style={{ border: '1px solid var(--border2)', color: 'var(--text)', padding: '16px 36px', fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.08em' }}>VIEW PRODUCTS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 52, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text3)', marginTop: 8, textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '100px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 12 }}>// PRODUCT RANGE</div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', color: 'var(--white)', fontFamily: 'Bebas Neue' }}>WHAT WE<br />MANUFACTURE</h2>
          </div>
          <Link href="/products" style={{ color: 'var(--text2)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid var(--border2)', paddingBottom: 4 }}>All Products →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border)' }}>
          {products.map((p) => (
            <div key={p.code} style={{ background: 'var(--bg)', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 24, right: 24, fontFamily: 'Bebas Neue', fontSize: 48, color: 'var(--border2)', lineHeight: 1 }}>{p.code}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 12 }}>INDUSTRIAL GRADE</div>
              <h3 style={{ fontSize: 28, color: 'var(--white)', marginBottom: 16, fontFamily: 'Bebas Neue' }}>{p.name}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tags.map(tag => <span key={tag} style={{ border: '1px solid var(--border2)', padding: '3px 10px', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: '80px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 12 }}>// WHY GLOBNEXIS</div>
            <h2 style={{ fontSize: 'clamp(40px, 4vw, 64px)', color: 'var(--white)', marginBottom: 32, fontFamily: 'Bebas Neue' }}>FACTORY DIRECT.<br />NO MIDDLEMEN.</h2>
            <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>We manufacture every connector in our own 18,000m² facility in Shenzhen. No trading companies, no markup chains — you buy at factory price with full QC oversight.</p>
            <Link href="/about" style={{ display: 'inline-block', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '12px 28px', fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.08em', marginTop: 8 }}>LEARN MORE</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
            {[['⚡', 'Fast Sampling', '7–14 days sample lead time'], ['🔒', 'Strict QC', '100% electrical test before shipment'], ['🌍', 'Global Logistics', 'DHL/FedEx/Sea freight worldwide'], ['🛠️', 'OEM/ODM', 'Custom connectors, branding, packaging']].map(([icon, title, desc]) => (
              <div key={title} style={{ background: 'var(--bg)', padding: '28px 24px' }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: 'var(--white)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section>div>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Clients */}
      <section style={{ padding: '60px 32px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }}>TRUSTED BY ENGINEERS AT</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
          {clients.map(c => <span key={c} style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--border2)', letterSpacing: '0.1em' }}>{c}</span>)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 32px', background: 'var(--bg3)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// GET STARTED</div>
          <h2 style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--white)', marginBottom: 24, fontFamily: 'Bebas Neue' }}>READY TO SOURCE?</h2>
          <p style={{ color: 'var(--text2)', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>Send us your specs. We respond within 24 hours with a competitive factory-direct quotation.</p>
          <Link href="/rfq" style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '20px 56px', fontFamily: 'Bebas Neue', fontSize: 24, letterSpacing: '0.08em' }}>REQUEST FREE QUOTE</Link>
        </div>
      </section>
    </>
  );
}
