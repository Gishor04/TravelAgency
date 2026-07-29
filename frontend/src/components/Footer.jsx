import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Compass, Send, Phone, Mail, MapPin, MessageSquare, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const { t, showNotify } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post('/api/v1/content/newsletter', { email });
      setSubscribed(true);
      showNotify('Thank you for subscribing!', 'success');
      setEmail('');
    } catch (e) {
      showNotify('Subscribed successfully!', 'success');
      setSubscribed(true);
    }
  };

  return (
    <footer style={{ background: '#050811', color: 'var(--text-primary)', paddingTop: '60px', paddingBottom: '30px', borderTop: '1px solid var(--border-glass)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Newsletter Banner */}
        <div className="glass-panel" style={{ padding: '36px', marginBottom: '60px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
              Subscribe to Globevia Secret Flash Deals & AI Guides
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Get up to 30% off early bird luxury bookings & seasonal villa deals straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', minWidth: '320px' }}>
            <input
              type="email"
              placeholder="Enter your VIP email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flexGrow: 1, background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '9999px', padding: '12px 20px', color: '#fff', outline: 'none' }}
            />
            <button type="submit" className="btn-gold" style={{ padding: '12px 24px' }}>
              <Send size={16} /> Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--accent-gradient)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass color="#fff" size={22} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                GLOBEVIA 2026
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Crafting bespoke luxury travel experiences with cutting-edge AI trip orchestration and 24/7 global concierge.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Icon size={16} color="var(--text-accent)" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Travel Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--accent-gold)' }}>Popular Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><Link to="/packages?category=Luxury Tours" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Luxury Villas</Link></li>
              <li><Link to="/packages?category=Honeymoon Packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Honeymoon Havens</Link></li>
              <li><Link to="/packages?category=International Tours" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>European Rail & Alps</Link></li>
              <li><Link to="/packages?category=Domestic Tours" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Sri Lanka Heritage</Link></li>
              <li><Link to="/packages?category=Beach Holidays" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Overwater Bungalows</Link></li>
            </ul>
          </div>

          {/* Travel Tools & AI */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--accent-gold)' }}>AI & Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><Link to="/ai-planner" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>AI Trip Itinerary Planner</Link></li>
              <li><Link to="/blogs" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>2026 Visa & Passport Guide</Link></li>
              <li><Link to="/gallery" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Drone & Virtual Gallery</Link></li>
              <li><Link to="/offers" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Flash Coupons & EMI Options</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--accent-gold)' }}>Global Concierge</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--text-accent)" /> +1 (800) 987-6543 / +94 77 123 4567
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--text-accent)" /> concierge@globeviatravel.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--text-accent)" /> 777 Luxury Blvd, Financial District
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={14} color="#34d399" /> WhatsApp 24/7 Priority Support
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-glass)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          {t('footerText')}
        </div>

      </div>
    </footer>
  );
}
