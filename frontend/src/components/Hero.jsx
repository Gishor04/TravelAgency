import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Calendar, DollarSign, Sparkles, Filter, Users } from 'lucide-react';

export default function Hero() {
  const { t } = useApp();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [duration, setDuration] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (destination) queryParams.set('search', destination);
    if (category) queryParams.set('category', category);
    if (maxBudget) queryParams.set('maxPrice', maxBudget);
    navigate(`/packages?${queryParams.toString()}`);
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', overflow: 'hidden' }}>
      
      {/* Background Image / Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 22, 0.4), rgba(9, 13, 22, 0.95)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
        
        {/* Pill Header Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px', marginBottom: '24px' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            2026 AI-POWERED LUXURY DISCOVERY
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: 'calc(2.2rem + 2vw)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('heroTitle')}
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
          {t('heroSubtitle')}
        </p>

        {/* Smart AI Search Bar Panel */}
        <form onSubmit={handleSearch} className="glass-panel" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
          
          {/* Destination input */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
              Destination / Country
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-glass-card)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <MapPin size={18} color="var(--text-accent)" />
              <input
                type="text"
                placeholder="e.g. Bali, Switzerland, Sri Lanka"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          {/* Tour Category */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
              Tour Category
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-glass-card)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <Filter size={18} color="var(--accent-gold)" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <option value="" style={{ background: 'var(--bg-secondary)' }}>All Travel Styles</option>
                <option value="Luxury Tours" style={{ background: 'var(--bg-secondary)' }}>Luxury Tours</option>
                <option value="Honeymoon Packages" style={{ background: 'var(--bg-secondary)' }}>Honeymoon Packages</option>
                <option value="International Tours" style={{ background: 'var(--bg-secondary)' }}>International Tours</option>
                <option value="Domestic Tours" style={{ background: 'var(--bg-secondary)' }}>Domestic Heritage</option>
                <option value="Family Tours" style={{ background: 'var(--bg-secondary)' }}>Family Discoveries</option>
                <option value="Beach Holidays" style={{ background: 'var(--bg-secondary)' }}>Beach & Islands</option>
              </select>
            </div>
          </div>

          {/* Max Budget */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
              Max Budget ($)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-glass-card)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <DollarSign size={18} color="#34d399" />
              <input
                type="number"
                placeholder="e.g. 2500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          {/* Search Action Button */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              <Search size={18} /> {t('searchBtn')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
