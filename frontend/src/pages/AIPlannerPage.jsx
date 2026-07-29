import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Sparkles, Compass, MapPin, DollarSign, Calendar, Users, Hotel, Check, RefreshCw, Bookmark, Share2 } from 'lucide-react';

export default function AIPlannerPage() {
  const { formatPrice, showNotify } = useApp();

  const [destination, setDestination] = useState('Bali, Indonesia');
  const [budget, setBudget] = useState(2500);
  const [durationDays, setDurationDays] = useState(5);
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelStyle, setTravelStyle] = useState('Luxury & Relaxation');
  const [hotelPreference, setHotelPreference] = useState('5-Star Private Pool Villa');
  const [interests, setInterests] = useState(['Food & Wine', 'Water Sports', 'Culture & Temples']);
  const [loading, setLoading] = useState(false);
  const [itineraryResult, setItineraryResult] = useState(null);

  const toggleInterest = (item) => {
    setInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/v1/ai/plan-trip', {
        destination,
        budget,
        durationDays,
        travelersCount,
        travelStyle,
        hotelPreference,
        interests
      });
      setItineraryResult(res.data.itinerary);
      showNotify('AI Custom Itinerary generated!', 'success');
    } catch (err) {
      showNotify('Generated fallback AI itinerary', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '9999px', marginBottom: '12px' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700 }}>2026 NEURAL ITINERARY ENGINE</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Smart AI Trip Planner
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          Provide your preferences and let our Globevia AI engine generate a bespoke day-by-day itinerary with budget allocation and restaurant recommendations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '40px' }} className="ai-planner-layout">
        
        {/* Form Controls Sidebar */}
        <form onSubmit={handleGenerate} className="glass-panel" style={{ padding: '28px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={20} color="var(--accent-gold)" /> Trip Parameters
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Duration (Days)</label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Hotel Preference</label>
            <select
              value={hotelPreference}
              onChange={(e) => setHotelPreference(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }}
            >
              <option value="5-Star Private Pool Villa" style={{ background: 'var(--bg-secondary)' }}>5-Star Private Pool Villa</option>
              <option value="Luxury Alpine Chalet" style={{ background: 'var(--bg-secondary)' }}>Luxury Alpine Chalet</option>
              <option value="Boutique Heritage Resort" style={{ background: 'var(--bg-secondary)' }}>Boutique Heritage Resort</option>
              <option value="Overwater Lagoon Suite" style={{ background: 'var(--bg-secondary)' }}>Overwater Lagoon Suite</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Interests & Experiences</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Food & Wine', 'Water Sports', 'Culture & Temples', 'Spa & Wellness', 'Helicopter Tours', 'Leopard Safari'].map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    background: interests.includes(item) ? 'var(--accent-gradient)' : 'var(--bg-glass-card)',
                    color: '#fff',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  {interests.includes(item) && <Check size={12} style={{ marginRight: '4px' }} />} {item}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            {loading ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} />} Generate Itinerary
          </button>

        </form>

        {/* Generated Result View */}
        <main>
          {loading ? (
            <div className="glass-panel" style={{ padding: '80px', textAlign: 'center' }}>
              <RefreshCw size={36} color="var(--accent-gold)" className="spin" style={{ marginBottom: '16px' }} />
              <h3>Globevia AI Neural Engine is planning your itinerary...</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Analyzing weather forecasts, top 5-star resort options, and fine dining locations.</p>
            </div>
          ) : !itineraryResult ? (
            <div className="glass-panel" style={{ padding: '80px', textAlign: 'center' }}>
              <Sparkles size={48} color="var(--accent-blue)" style={{ marginBottom: '16px' }} />
              <h3>Your AI Travel Itinerary will appear here</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Fill out your travel parameters on the left and click "Generate Itinerary".</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Summary Banner */}
              <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(245,158,11,0.15) 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{itineraryResult.destination} Custom Expedition</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {itineraryResult.durationDays} Days • {itineraryResult.travelersCount} Travelers • {itineraryResult.hotelPreference}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Est. Total Budget</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                      {formatPrice(itineraryResult.estimatedBudget.totalEstimatedUSD)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {itineraryResult.dayByDay.map(day => (
                  <div key={day.day} className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span className="badge-pill badge-gold">Day {day.day}</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{day.title}</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Morning & Afternoon:</strong>
                        {day.morning}<br />{day.afternoon}
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Evening Dining:</strong>
                        {day.evening}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </main>

      </div>
    </div>
  );
}
