import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Star, Clock, MapPin, CheckCircle, XCircle, Heart, Share2, Calendar, Users, Hotel, Plane, Utensils, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PackageDetail() {
  const { identifier } = useParams();
  const { formatPrice, wishlist, toggleWishlist, showNotify } = useApp();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPackageDetail();
  }, [identifier]);

  const fetchPackageDetail = async () => {
    try {
      const res = await axios.get(`/api/v1/packages/${identifier}`);
      setPkg(res.data.package);
      if (res.data.package?.images?.length > 0) {
        setActiveImage(res.data.package.images[0]);
      }
      if (res.data.package?.availableDates?.length > 0) {
        setSelectedDate(new Date(res.data.package.availableDates[0]).toISOString().split('T')[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading package specs...</div>;
  }

  if (!pkg) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Package not found.</div>;
  }

  const basePrice = pkg.discountPrice || pkg.price;
  const totalPrice = Math.round(basePrice * (adults + children * 0.7));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotify('Package link copied to clipboard!', 'success');
  };

  const handleBookNow = () => {
    navigate('/booking', {
      state: {
        packageId: pkg._id,
        packageTitle: pkg.title,
        selectedDate,
        adults,
        children,
        totalPrice
      }
    });
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Title & Badges */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span className="badge-pill badge-gold">{pkg.category}</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={16} /> {pkg.destination}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Star size={16} fill="#fbbf24" /> {pkg.ratings} ({pkg.reviewCount} reviews)
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          {pkg.title}
        </h1>
      </div>

      {/* Main Image Gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '40px' }} className="gallery-grid">
        <div style={{ height: '420px', borderRadius: '20px', overflow: 'hidden' }}>
          <img src={activeImage || pkg.images[0]} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '420px' }}>
          {pkg.images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(img)}
              style={{
                flexGrow: 1,
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: activeImage === img ? '2px solid var(--accent-gold)' : 'none'
              }}
            >
              <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Layout Grid: Details Left, Booking Widget Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }} className="package-detail-layout">
        
        <div>
          {/* Nav Tabs */}
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-glass)', marginBottom: '28px' }}>
            {['overview', 'itinerary', 'hotel & flight', 'inclusions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  padding: '12px 16px',
                  color: activeTab === tab ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>Tour Highlights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle size={20} color="#34d399" />
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{h}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>Interactive Location Map</h3>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', marginBottom: '32px' }}>
                <MapPin size={32} color="var(--accent-blue)" style={{ marginBottom: '8px' }} />
                <h4>Coordinates: {pkg.mapCoordinates?.lat || -8.4095}, {pkg.mapCoordinates?.lng || 115.1889}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Interactive Google Map API view available on live key insertion.</p>
              </div>
            </div>
          )}

          {/* Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span className="badge-pill badge-gold">Day {day.day}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{day.title}</h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '12px' }}>
                    {day.description}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-accent)' }}>
                    <strong>Accommodation:</strong> {day.accommodation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hotel & Flight Tab */}
          {activeTab === 'hotel & flight' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Hotel size={36} color="var(--accent-gold)" />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{pkg.hotelDetails?.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Room Type: {pkg.hotelDetails?.roomType} ({pkg.hotelDetails?.rating} Stars)</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {pkg.hotelDetails?.amenities?.map((a, i) => (
                      <span key={i} className="badge-pill badge-blue" style={{ fontSize: '0.7rem' }}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Plane size={36} color="var(--text-accent)" />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Airline: {pkg.flightDetails?.airline}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Class: {pkg.flightDetails?.class} | Departure: {pkg.departureAirport}</p>
                </div>
              </div>
            </div>
          )}

          {/* Inclusions Tab */}
          {activeTab === 'inclusions' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <h4 style={{ color: '#34d399', marginBottom: '16px' }}>Inclusions</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="#34d399" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <h4 style={{ color: '#f43f5e', marginBottom: '16px' }}>Exclusions</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <XCircle size={16} color="#f43f5e" /> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Booking Card */}
        <aside className="glass-panel" style={{ padding: '28px', height: 'fit-content' }}>
          
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price per traveler</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatPrice(basePrice)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => toggleWishlist(pkg._id)} style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Heart size={18} color={wishlist.includes(pkg._id) ? '#f43f5e' : '#fff'} fill={wishlist.includes(pkg._id) ? '#f43f5e' : 'none'} />
              </button>
              <button onClick={handleShare} style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Share2 size={18} color="var(--text-accent)" />
              </button>
            </div>
          </div>

          {/* Date Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Departure Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* Travelers counter */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Adults</label>
              <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '12px', color: 'var(--text-primary)' }}>
                {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n} style={{ background: 'var(--bg-secondary)' }}>{n} Adult{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Children</label>
              <select value={children} onChange={(e) => setChildren(Number(e.target.value))} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '12px', color: 'var(--text-primary)' }}>
                {[0,1,2,3,4].map(n => <option key={n} value={n} style={{ background: 'var(--bg-secondary)' }}>{n} Child</option>)}
              </select>
            </div>
          </div>

          {/* Total Price Summary */}
          <div style={{ background: 'var(--bg-glass-card)', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Estimated Total</span>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent-gold)' }}>{formatPrice(totalPrice)}</span>
          </div>

          <button onClick={handleBookNow} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
            Proceed to Book <ArrowRight size={18} />
          </button>

        </aside>

      </div>

    </div>
  );
}
