import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | GlobNexis — M12 M8 Connector Manufacturer China',
  description: 'Browse our full range of M12 connectors, M8 connectors, industrial plugs, and automation cables. Factory-direct from Shenzhen, China.',
};

const products = [
  {
    code: 'M12', name: 'M12 Connector Series',
    desc: 'Our flagship product line. Available in A/B/D/X/S/T coding, 3 to 17 pins. IP67 and IP68 rated. Suitable for PROFIBUS, DeviceNet, Ethernet/IP, CANopen, and IO-Link applications.',
    specs: [['Coding', 'A / B / D / X / S / T'], ['Pin Count', '3, 4, 5, 8, 12, 17'], ['Protection', 'IP67, IP68'], ['Cable', 'PUR, PVC, TPE'], ['Temp Range', '-40°C to +85°C'], ['Standard', 'IEC 61076-2-101']],
    tags: ['Automation', 'Sensors', 'Field Bus', 'Ethernet'],
    seoPage: 'M12 Connector Supplier — Factory Direct from China',
  },
  {
    code: 'M8', name: 'M8 Connector Series',
    desc: 'Compact threaded connectors for space-constrained applications. 3, 4, 6 and 8-pin variants. Ideal for proximity sensors, photoelectric sensors and small actuators.',
    specs: [['Pin Count', '3, 4, 6, 8'], ['Protection', 'IP67'], ['Cable', 'PUR, PVC'], ['Temp Range', '-25°C to +70°C'], ['Locking', 'Screw / Push-pull'], ['Standard', 'IEC 61076-2-104']],
    tags: ['Sensors', 'Compact', 'Field Bus'],
    seoPage: 'M8 Connector Factory China — Wholesale Price',
  },
  {
    code: 'PLG', name: 'Industrial Plug & Socket',
    desc: 'Heavy-duty CEE-standard plugs, sockets and connectors. Suitable for temporary and permanent power distribution on factory floors, construction sites and offshore environments.',
    specs: [['Current', '16A, 32A, 63A, 125A'], ['Poles', '2P+E, 3P+E, 3P+N+E'], ['Voltage', '110V, 230V, 400V'], ['Protection', 'IP44, IP67'], ['Material', 'Polyamide PA'], ['Standard', 'IEC 60309']],
    tags: ['Power', 'CEE', 'IP67', 'Heavy Duty'],
    seoPage: 'Industrial Plug Wholesale — CEE Standard Factory',
  },
  {
    code: 'CBL', name: 'Automation Cable',
    desc: 'Flexible PUR and PVC jacketed cables for dynamic applications. Drag chain rated, torsion tested, oil and chemical resistant. Available in standard and custom lengths with or without connectors.',
    specs: [['Jacket', 'PUR, PVC, TPE'], ['Application', 'Drag chain, Robot arm'], ['Flexing', '10 million cycles'], ['Oil Resistance', 'Yes (PUR)'], ['Shielding', 'Braid / Foil / Both'], ['Custom', 'Length, color, gauge']],
    tags: ['Flexible', 'Drag Chain', 'Robotics', 'Custom'],
    seoPage: 'Automation Cable Manufacturer China — Custom OEM',
  },
];

export default function Products() {
  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 32, paddingRight: 32, borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// PRODUCT CATALOG</div>
          <h1 style={{ fontSize: 'clamp(56px, 8vw, 120px)', color: 'var(--white)', fontFamily: 'Bebas Neue', lineHeight: 0.9, marginBottom: 24 }}>OUR<br />PRODUCTS</h1>
          <p style={{ color: 'var(--text2)', fontSize: 17, maxWidth: 560, lineHeight: 1.7 }}>
            All products are manufactured in-house at our Shenzhen facility. Custom specifications, OEM branding, and private label programs available.
          </p>
        </div>
      </section>

      {/* Product List */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        {products.map((p, i) => (
          <div key={p.code} style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 1,
            background: 'var(--border)', marginBottom: 1,
          }}>
            {/* Left */}
            <div style={{ background: 'var(--bg2)', padding: '56px 48px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 80, color: 'var(--border2)', lineHeight: 1, marginBottom: 8 }}>{p.code}</div>
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: 'var(--white)', marginBottom: 20 }}>{p.name}</h2>
              <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {p.tags.map(tag => <span key={tag} style={{ border: '1px solid var(--border2)', padding: '4px 12px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>{tag}</span>)}
              </div>
              <Link href="/rfq" style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '12px 28px', fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.08em' }}>REQUEST QUOTE</Link>
            </div>
            {/* Right — Spec table */}
            <div style={{ background: 'var(--bg)', padding: '56px 48px' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 24 }}>SPECIFICATIONS</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {p.specs.map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 0', color: 'var(--text3)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', width: '40%' }}>{key}</td>
                      <td style={{ padding: '14px 0', color: 'var(--text)', fontSize: 14 }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/rfq" style={{ background: 'var(--accent)', color: '#000', padding: '10px 24px', fontFamily: 'Bebas Neue', fontSize: 16, letterSpacing: '0.08em', display: 'inline-block' }}>GET QUOTE</Link>
                <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>MOQ: 500 pcs · Lead time: 7–21 days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CTA */}
      <section style={{ margin: '0 32px 80px', padding: '60px 48px', background: 'var(--bg2)', border: '1px solid var(--border)', maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 12 }}>// CUSTOM SOLUTIONS</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 48, color: 'var(--white)', lineHeight: 1 }}>NEED A CUSTOM SPEC?</h2>
          <p style={{ color: 'var(--text2)', marginTop: 12, fontSize: 15 }}>We handle OEM, ODM and private label orders from 500 pcs MOQ.</p>
        </div>
        <Link href="/rfq" style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '16px 40px', fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>DISCUSS MY PROJECT</Link>
      </section>
    </>
  );
}
