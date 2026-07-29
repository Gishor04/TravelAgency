import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import TrustSection from '../components/TrustSection';
import { Compass, Sparkles, Star, TrendingUp, MapPin, Calendar, CheckCircle2, ArrowRight, Instagram, Users, ShieldCheck, Flame } from 'lucide-react';

export default function Home() {
  const { t } = useApp();
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [pkgRes, destRes, blogRes, revRes] = await Promise.all([
        axios.get('/api/v1/packages'),
        axios.get('/api/v1/content/destinations'),
        axios.get('/api/v1/content/blogs'),
        axios.get('/api/v1/content/reviews')
      ]);
      setPackages(pkgRes.data.packages || []);
      setDestinations(destRes.data.destinations || []);
      setBlogs(blogRes.data.blogs || []);
      setReviews(revRes.data.reviews || []);
    } catch (err) {
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Categories Bar */}
      <section style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
          {[
            'Luxury Tours', 'Honeymoon Packages', 'International Tours',
            'Domestic Tours', 'Family Tours', 'Adventure Tours', 'Beach Holidays', 'Cruise Packages'
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/packages?category=${encodeURIComponent(cat)}`}
              className="glass-card"
              style={{
                padding: '12px 24px',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={14} color="#fbbf24" /> {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured & Trending Tour Packages */}
      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <span className="badge-pill badge-gold" style={{ marginBottom: '8px' }}>
              <Flame size={12} style={{ display: 'inline', marginRight: '4px' }} /> CURATED LUXURY
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('trendingTours')}
            </h2>
          </div>
          <Link to="/packages" className="btn-outline">
            View All Packages <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-container">
          {packages.slice(0, 3).map((pkg) => (
            <TourCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Customer Statistics Section */}
      <section style={{ padding: '50px 20px', background: 'var(--accent-gradient)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>50,000+</h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Global Happy Travelers</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>99.4%</h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Verified 5-Star Rating</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>85+</h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Bespoke Destinations</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>24/7</h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>AI & WhatsApp Concierge</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations Banner Carousel */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-pill badge-blue" style={{ marginBottom: '8px' }}>EXPLORE THE WORLD</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('popularDestinations')}
          </h2>
        </div>

        <div className="grid-container">
          {destinations.map((dest) => (
            <div key={dest._id} className="glass-card" style={{ overflow: 'hidden', position: 'relative', height: '320px' }}>
              <img
                src={dest.coverImage}
                alt={dest.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,13,22,0.95) 0%, transparent 60%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 700, uppercase: 'true' }}>{dest.country}</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{dest.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dest.description}</p>
                <Link to={`/packages?country=${encodeURIComponent(dest.country)}`} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.8rem', width: 'fit-content' }}>
                  Explore {dest.name} Packages
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Trip Planner Callout Banner */}
      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '50px 40px', background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(124,58,237,0.2) 100%)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
          <div style={{ maxWidth: '650px' }}>
            <span className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>AURA AI ORCHESTRATION</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Let AI Craft Your Perfect Day-by-Day Itinerary in Seconds
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Specify your dream destination, budget, group size, and travel style. Our neural engine generates a custom day-by-day itinerary with Michelin dining, 5-star villas, and real-time expense calculations.
            </p>
            <Link to="/ai-planner" className="btn-gold" style={{ padding: '14px 32px' }}>
              <Sparkles size={18} /> Launch AI Trip Planner
            </Link>
          </div>
          <div style={{ width: '100%', maxWidth: '400px', height: '260px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800" alt="AI Planner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Customer Reviews & Video Testimonials */}
      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-pill badge-gold" style={{ marginBottom: '8px' }}>REAL EXPERIENCES</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t('reviewsTitle')}
          </h2>
        </div>

        <div className="grid-container">
          {reviews.map((rev) => (
            <div key={rev._id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>"{rev.title}"</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {rev.comment}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={rev.userAvatar} alt={rev.userName} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{rev.userName}</h5>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Verified Traveler
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Blog Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <span className="badge-pill badge-blue" style={{ marginBottom: '8px' }}>INSIGHTS & GUIDES</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2026 Travel Journal & Visa Guides
            </h2>
          </div>
          <Link to="/blogs" className="btn-outline">Read All Guides</Link>
        </div>

        <div className="grid-container">
          {blogs.map((b) => (
            <div key={b._id} className="glass-card" style={{ overflow: 'hidden' }}>
              <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span className="badge-pill badge-gold" style={{ marginBottom: '8px', fontSize: '0.7rem' }}>{b.category}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{b.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>{b.readTime} • By {b.author}</p>
                <Link to="/blogs" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Certifications */}
      <TrustSection />
    </div>
  );
}
