'use client';
import { useState } from 'react';

const products = ['M12 Connector', 'M8 Connector', 'Industrial Plug', 'Automation Cable', 'Custom / Other'];

export default function RFQ() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', product: '', quantity: '', message: ''
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Web3Forms: free, no backend needed, works on GitHub Pages/Vercel/Netlify
      // Get your free access key at: https://web3forms.com (takes 30 seconds)
      // Then set it in .env as NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY';
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New RFQ: ${form.product} — ${form.company} (${form.country})`,
          from_name: 'GlobNexis RFQ System',
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else throw new Error(data.message);
    } catch (err) {
      alert('Submission failed. Please email us directly at sales@globnexis.com');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg2)', border: '1px solid var(--border2)',
    color: 'var(--text)', padding: '14px 16px', fontSize: 14, outline: 'none',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
    borderRadius: 0,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, letterSpacing: '0.15em', color: 'var(--text3)',
    fontFamily: 'JetBrains Mono, monospace', display: 'block', marginBottom: 8,
  };

  if (submitted) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 96, color: 'var(--accent)', lineHeight: 1 }}>✓</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 56, color: 'var(--white)', marginBottom: 16 }}>QUOTE RECEIVED</h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.7 }}>
            Thank you, <strong style={{ color: 'var(--white)' }}>{form.name}</strong>! Our sales team will review your enquiry and respond within <strong style={{ color: 'var(--accent)' }}>24 hours</strong>.
          </p>
          <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text3)', lineHeight: 2 }}>
            <div>📧 sales@globnexis.com</div>
            <div>📱 +86 755 0000 0000 (WhatsApp)</div>
            <div>🕐 Mon–Fri 9:00–18:00 CST</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: 140, paddingBottom: 64, paddingLeft: 32, paddingRight: 32, borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>// REQUEST FOR QUOTATION</div>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(56px, 8vw, 112px)', color: 'var(--white)', lineHeight: 0.9 }}>
            GET A<br /><span style={{ color: 'var(--accent)' }}>FREE QUOTE</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>
            Fill in your requirements. We respond within 24 hours with a factory-direct quotation — no middlemen, no markup.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>FULL NAME *</label>
              <input required value={form.name} onChange={set('name')} placeholder="John Smith" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>COMPANY *</label>
              <input required value={form.company} onChange={set('company')} placeholder="Acme Engineering GmbH" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>EMAIL *</label>
              <input required type="email" value={form.email} onChange={set('email')} placeholder="john@company.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>PHONE / WHATSAPP</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+49 123 456789" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>COUNTRY *</label>
              <input required value={form.country} onChange={set('country')} placeholder="Germany" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>PRODUCT TYPE *</label>
              <select required value={form.product} onChange={set('product')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select product...</option>
                {products.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>ESTIMATED QUANTITY (PCS/MONTH)</label>
            <input value={form.quantity} onChange={set('quantity')} placeholder="e.g. 5,000 pcs/month" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>PRODUCT REQUIREMENTS & SPECIFICATIONS *</label>
            <textarea
              required value={form.message} onChange={set('message')} rows={6}
              placeholder="Please describe: connector type, pin count, IP rating, cable length, quantity, intended application, certifications needed..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              background: loading ? 'var(--border2)' : 'var(--accent)',
              color: '#000', padding: '18px 48px',
              fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.08em',
              border: 'none', cursor: loading ? 'wait' : 'pointer',
              width: '100%', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            {loading ? 'SENDING...' : 'SEND QUOTE REQUEST'}
          </button>
          <p style={{ color: 'var(--text3)', fontSize: 12, marginTop: 12, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.6 }}>
            🔒 Your information is confidential. We never share your data with third parties.
          </p>
        </form>

        {/* Sidebar */}
        <div>
          <div style={{ padding: '32px', background: 'var(--bg2)', border: '1px solid var(--border)', marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 20 }}>DIRECT CONTACT</div>
            {[
              ['📧 Email', 'sales@globnexis.com'],
              ['📱 WhatsApp', '+86 755 0000 0000'],
              ['🕐 Response Time', 'Within 24 hours'],
              ['📍 Location', 'Shenzhen, Guangdong, China'],
            ].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{label}</div>
                <div style={{ color: 'var(--text)', fontSize: 14 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '32px', background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 20 }}>WHAT HAPPENS NEXT</div>
            {[
              'We review your specs within 24 hrs',
              'Our engineer confirms technical fit',
              'You receive itemized factory quotation',
              'Free sample available on request',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: 'var(--accent)', minWidth: 24, lineHeight: 1.3 }}>{i + 1}</span>
                <span style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          form + div { display: none; }
          div[style*="grid-template-columns: 1.6fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--accent) !important;
        }
      `}</style>
    </>
  );
}
