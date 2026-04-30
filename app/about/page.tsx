import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About GlobNexis | Industrial Connector Factory China',
  description: 'Learn about GlobNexis — our 18,000m² manufacturing facility in Shenzhen, ISO 9001 certification, and 16+ years of industrial connector manufacturing.',
};

const timeline = [
  { year: '2008', event: 'Founded in Shenzhen. First M12 connector production line launched.' },
  { year: '2011', event: 'Achieved ISO 9001:2008 certification. Expanded to European markets.' },
  { year: '2014', event: 'Moved to 18,000m² purpose-built factory in Longhua, Shenzhen.' },
  { year: '2017', event: 'Launched automation cable product line. 5,000+ clients milestone.' },
  { year: '2020', event: 'CE and RoHS compliance across all product families.' },
  { year: '2023', event: '10,000+ global clients. 60+ countries. 2M+ units/month capacity.' },
];

const certifications = ['ISO 9001:2015', 'CE Marking', 'RoHS Compliant', 'UL Listed', 'REACH Compliant'];

export default function About() {
  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 32, paddingRight: 32, borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(ellipse at right, rgba(200,255,0,0.04), transparent 70%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// ABOUT US</div>
            <h1 style={{ fontSize: 'clamp(56px, 8vw, 112px)', color: 'var(--white)', fontFamily: 'Bebas Neue', lineHeight: 0.9, marginBottom: 24 }}>BUILT IN<br />CHINA.<br /><span style={{ color: 'var(--accent)' }}>SHIPPED<br />WORLDWIDE.</span></h1>
          </div>
          <div>
            <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.8 }}>
              GlobNexis is a vertically integrated manufacturer of industrial connectors and automation cables, headquartered in Shenzhen, Guangdong Province. We own our factory, our tooling, and our quality process — which means you get consistent quality without middleman markups.
            </p>
          </div>
        </div>
      </section>

      {/* Factory Stats */}
      <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {[['18,000m²', 'Factory Floor'], ['320+', 'Employees'], ['40+', 'CNC Machines'], ['3', 'Production Lines'], ['24hr', 'RFQ Response']].map(([val, label], i, arr) => (
            <div key={label} style={{ padding: '36px 0', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 40, color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text3)', marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// COMPANY HISTORY</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 56, color: 'var(--white)', marginBottom: 56 }}>OUR JOURNEY</h2>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
          {timeline.map((t, i) => (
            <div key={t.year} style={{ display: 'flex', gap: 40, marginBottom: 40, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 80, fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--accent)', paddingTop: 2, textAlign: 'right' }}>{t.year}</div>
              <div style={{ width: 9, height: 9, background: 'var(--accent)', borderRadius: '50%', marginTop: 6, flexShrink: 0, position: 'relative', zIndex: 1 }} />
              <div style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, paddingTop: 0 }}>{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }}>// CERTIFICATIONS & COMPLIANCE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {certifications.map(cert => (
              <div key={cert} style={{ border: '1px solid var(--border2)', padding: '16px 28px', background: 'var(--bg)' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--white)', letterSpacing: '0.06em' }}>{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 56, color: 'var(--white)', lineHeight: 1 }}>VISIT OUR FACTORY</h2>
          <p style={{ color: 'var(--text2)', marginTop: 12, fontSize: 15 }}>We welcome supplier audits and factory visits. Schedule yours today.</p>
        </div>
        <Link href="/rfq" style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '16px 40px', fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.08em' }}>GET IN TOUCH</Link>
      </section>
    </>
  );
}
