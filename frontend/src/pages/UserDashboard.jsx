import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { User, Calendar, FileText, Heart, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const { formatPrice, wishlist } = useApp();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get('/api/v1/bookings/my-bookings');
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Profile Header Banner */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome back, {user?.name || 'Luxury Traveler'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user?.email} • Member Tier: VIP Gold</p>
        </div>
      </div>

      {/* Booking History */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} color="var(--accent-gold)" /> My Booking History ({bookings.length})
        </h3>

        {loading ? (
          <div>Loading your reservations...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1rem', marginBottom: '8px' }}>You have no active reservations yet.</p>
            <p style={{ fontSize: '0.85rem' }}>Explore our luxury tour packages and complete a reservation to see your itinerary and invoice here!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px' }}>Booking No</th>
                  <th style={{ padding: '12px' }}>Tour Package</th>
                  <th style={{ padding: '12px' }}>Departure Date</th>
                  <th style={{ padding: '12px' }}>Total Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--accent-gold)' }}>{b.bookingNumber}</td>
                    <td style={{ padding: '16px', fontWeight: 600 }}>
                      {b.tourPackage?.title || 'Globevia Luxury Tour Expedition'}
                    </td>
                    <td style={{ padding: '16px' }}>{new Date(b.selectedDate).toLocaleDateString()}</td>
                    <td style={{ padding: '16px', fontWeight: 700 }}>{formatPrice(b.totalAmount)}</td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge-pill badge-emerald">{b.bookingStatus}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button onClick={() => window.print()} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <FileText size={14} /> Download Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
