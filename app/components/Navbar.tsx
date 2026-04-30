'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,8,0.95)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 32px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue', fontSize: 28, letterSpacing: '0.1em', color: 'var(--white)' }}>
          GLOB<span style={{ color: 'var(--accent)' }}>NEXIS</span>
        </Link>

        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="desktop-nav">
          {[['Products', '/products'], ['About', '/about'], ['RFQ', '/rfq']].map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">{label}</Link>
          ))}
          <Link href="/rfq" className="nav-cta">GET QUOTE</Link>
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'none' }} className="mobile-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '20px 32px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[['Products', '/products'], ['About', '/about'], ['RFQ', '/rfq']].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)' }}>{label}</Link>
          ))}
          <Link href="/rfq" onClick={() => setOpen(false)} style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.08em', textAlign: 'center' }}>GET QUOTE</Link>
        </div>
      )}

      <style>{`
        .nav-link {
          font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text2); font-weight: 500; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--accent); }
        .nav-cta {
          background: var(--accent); color: #000; padding: 8px 20px;
          font-family: 'Bebas Neue', sans-serif; font-size: 16px;
          letter-spacing: 0.08em; transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
