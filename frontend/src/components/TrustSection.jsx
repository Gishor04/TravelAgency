import React from 'react';
import { ShieldCheck, Award, Lock, Headphones, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
  return (
    <section style={{ padding: '60px 20px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
          World-Class Trust & Security Standards
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Certified by international travel federations and encrypted with enterprise 256-bit SSL protocols.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Award color="#38bdf8" size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>IATA & License Certified</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Reg. No: REG-2026-LUX-9981<br />License: TA-LIC-88271 | IATA Member
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <ShieldCheck color="#fbbf24" size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>99.4% Verified Satisfaction</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Over 50,000+ happy global travelers across 85+ luxury destinations.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Lock color="#34d399" size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Encrypted Checkout</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Stripe 3D Secure & PayHere gateway protection for instant peace of mind.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Headphones color="#f472b6" size={28} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>24/7 Personal Concierge</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Instant WhatsApp support & dedicated travel specialist assigned to every booking.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
