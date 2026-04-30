import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', marginTop: 80 }}>
      <div style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden', padding: '10px 0', background: 'var(--bg3)' }}>
        <div style={{ display: 'flex', animation: 'ticker 28s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array(2).fill(['M12 CONNECTOR SUPPLIER', 'M8 CONNECTOR FACTORY', 'INDUSTRIAL PLUG WHOLESALE', 'AUTOMATION CABLE MANUFACTURER', 'CHINA FACTORY DIRECT', 'ISO 9001 CERTIFIED', 'GLOBAL SHIPPING']).flat().map((t, i) => (
            <span key={i} style={{ padding: '0 40px', fontSize: 11, letterSpacing: '0.2em', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
              {t} <span style={{ color: 'var(--accent)', margin: '0 8px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '56px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 32, letterSpacing: '0.1em', marginBottom: 12 }}>
              GLOB<span style={{ color: 'var(--accent)' }}>NEXIS</span>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Factory-direct industrial connectors and automation cables. Serving 10,000+ clients across 60+ countries since 2008.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['ISO 9001', 'CE', 'RoHS'].map(cert => (
                <span key={cert} style={{ border: '1px solid var(--border2)', padding: '3px 10px', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>{cert}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text3)', marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>PRODUCTS</div>
            {['M12 Connectors', 'M8 Connectors', 'Industrial Plugs', 'Automation Cables', 'Custom Solutions'].map(p => (
              <Link key={p} href="/products" style={{ display: 'block', color: 'var(--text2)', fontSize: 14, marginBottom: 10 }}>{p}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text3)', marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>COMPANY</div>
            {[['About Us', '/about'], ['Products', '/products'], ['Get a Quote', '/rfq']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'var(--text2)', fontSize: 14, marginBottom: 10 }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text3)', marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>CONTACT</div>
            <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 2 }}>
              <div>sales@globnexis.com</div>
              <div>+86 755 0000 0000</div>
              <div style={{ marginTop: 8, color: 'var(--text3)', fontSize: 13 }}>Shenzhen, Guangdong<br />China 518000</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: 'var(--text3)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>© 2024 GlobNexis Co., Ltd. All rights reserved.</span>
          <span style={{ color: 'var(--text3)', fontSize: 13 }}>M12 Connector Supplier · Industrial Connector Factory China</span>
        </div>
      </div>

      <style>{`
        footer a:hover { color: var(--accent) !important; }
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer .container > div:first-child > div:first-child { grid-column: span 2; }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
          footer .container > div:first-child > div:first-child { grid-column: span 1; }
        }
      `}</style>
    </footer>
  );
}
