import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Star, Clock, MapPin, Heart, ArrowRight } from 'lucide-react';

export default function TourCard({ pkg }) {
  const { wishlist, toggleWishlist, formatPrice, t } = useApp();
  const isWishlisted = wishlist.includes(pkg._id);

  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Cover Image & Badges */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'}
          alt={pkg.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(pkg._id);
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Heart size={18} color={isWishlisted ? '#f43f5e' : '#fff'} fill={isWishlisted ? '#f43f5e' : 'none'} />
        </button>

        {/* Category Pill Badge */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
          <span className="badge-pill badge-gold">{pkg.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Location & Rating */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-accent)' }}>
              <MapPin size={14} /> {pkg.destination}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600 }}>
              <Star size={14} fill="#fbbf24" /> {pkg.ratings} ({pkg.reviewCount})
            </span>
          </div>

          {/* Package Title */}
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4, color: 'var(--text-primary)' }}>
            {pkg.title}
          </h3>

          {/* Duration Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <Clock size={14} /> {pkg.durationDays} Days / {pkg.durationNights} Nights
          </div>
        </div>

        {/* Footer Price & Action Link */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Starting from</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatPrice(pkg.discountPrice || pkg.price)}
              </span>
              {pkg.discountPrice > 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                  {formatPrice(pkg.price)}
                </span>
              )}
            </div>
          </div>

          <Link to={`/packages/${pkg.slug || pkg._id}`} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Details <ArrowRight size={14} />
          </Link>
        </div>

      </div>

    </div>
  );
}
