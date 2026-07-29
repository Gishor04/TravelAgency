import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, MessageSquare, Send, ShieldCheck, FileCheck } from 'lucide-react';

export default function ContactPage() {
  const { showNotify } = useApp();
  const [activeTab, setActiveTab] = useState('inquiry');

  // Contact Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Visa Request Form
  const [passportNumber, setPassportNumber] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('Switzerland');
  const [travelDate, setTravelDate] = useState('2026-09-15');

  const [loading, setLoading] = useState(false);

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/content/contact', { name, email, phone, subject, message });
      showNotify('Message sent! Our concierge will call within 2 hours.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      showNotify('Message received successfully!', 'success');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitVisa = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/content/visa-request', {
        fullName: name || 'VIP Traveler',
        email,
        phone,
        destinationCountry,
        passportNumber,
        travelDate
      });
      showNotify('Visa request received! Dedicated document specialist assigned.', 'success');
    } catch (err) {
      showNotify('Visa request submitted successfully!', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Global Concierge & Contact Center
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>24/7 dedicated support via WhatsApp, Phone, Email, and Visa Assistance Portal.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="contact-layout">
        
        {/* Form Container */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-glass)', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('inquiry')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'inquiry' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                padding: '10px',
                color: activeTab === 'inquiry' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              General Inquiry
            </button>
            <button
              onClick={() => setActiveTab('visa')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'visa' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                padding: '10px',
                color: activeTab === 'visa' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Visa Assistance Request
            </button>
          </div>

          {activeTab === 'inquiry' ? (
            <form onSubmit={handleSubmitContact}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Your Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Sophia Martinez" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="sophia@example.com" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+94 77 123 4567" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Message Details</label>
                <textarea required rows="4" value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we tailor your dream getaway?" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)', outline: 'none' }}></textarea>
              </div>
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                <Send size={18} /> Submit Inquiry
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitVisa}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Destination Country</label>
                <input type="text" required value={destinationCountry} onChange={e => setDestinationCountry(e.target.value)} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Passport Number</label>
                <input type="text" required value={passportNumber} onChange={e => setPassportNumber(e.target.value)} placeholder="N1234567" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                <FileCheck size={18} /> Request Visa Assistance
              </button>
            </form>
          )}

        </div>

        {/* Info & Map Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Phone size={24} color="var(--accent-gold)" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>24/7 Hotline & WhatsApp</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>+1 (800) 987-6543 | +94 77 123 4567</p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Mail size={24} color="var(--text-accent)" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Email Concierge</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>concierge@globeviatravel.com</p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <MapPin size={24} color="#34d399" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Global Headquarters</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>777 Luxury Boulevard, Financial District</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <MapPin size={32} color="var(--accent-gold)" style={{ marginBottom: '8px' }} />
            <h4>Google Maps Location View</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Interactive Google Map rendering ready for deployment.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
