import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Package, Calendar, Users, DollarSign, Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, Sparkles, X } from 'lucide-react';

export default function AdminDashboard() {
  const { formatPrice, showNotify } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'packages', 'bookings'
  const [stats, setStats] = useState(null);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Package Create / Edit
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editPackageId, setEditPackageId] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    title: '',
    slug: '',
    category: 'Luxury Tours',
    destination: '',
    country: '',
    city: '',
    price: 1500,
    discountPrice: 1299,
    durationDays: 5,
    durationNights: 4,
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'],
    highlights: ['Private villa', 'Guided excursions']
  });

  const COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, pkgRes, bookRes] = await Promise.all([
        axios.get('/api/v1/admin/stats'),
        axios.get('/api/v1/packages'),
        axios.get('/api/v1/admin/bookings')
      ]);
      setStats(statsRes.data.stats);
      setPackages(pkgRes.data.packages || []);
      setBookings(bookRes.data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditPackageId(null);
    setPkgForm({
      title: '',
      slug: '',
      category: 'Luxury Tours',
      destination: '',
      country: '',
      city: '',
      price: 1500,
      discountPrice: 1299,
      durationDays: 5,
      durationNights: 4,
      images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'],
      highlights: ['Private villa', 'Guided excursions']
    });
    setShowPackageModal(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (pkg) => {
    setEditPackageId(pkg._id);
    setPkgForm({
      title: pkg.title || '',
      slug: pkg.slug || '',
      category: pkg.category || 'Luxury Tours',
      destination: pkg.destination || '',
      country: pkg.country || '',
      city: pkg.city || '',
      price: pkg.price || 1500,
      discountPrice: pkg.discountPrice || 1299,
      durationDays: pkg.durationDays || 5,
      durationNights: pkg.durationNights || 4,
      images: pkg.images?.length ? pkg.images : ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'],
      highlights: pkg.highlights?.length ? pkg.highlights : ['Private villa', 'Guided excursions']
    });
    setShowPackageModal(true);
  };

  // Save Package (Create or Update)
  const handleSavePackage = async (e) => {
    e.preventDefault();
    try {
      const generatedSlug = pkgForm.slug || pkgForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const payload = { ...pkgForm, slug: generatedSlug };

      if (editPackageId) {
        await axios.put(`/api/v1/packages/${editPackageId}`, payload);
        showNotify('Tour Package updated successfully!', 'success');
      } else {
        await axios.post('/api/v1/packages', payload);
        showNotify('New Tour Package created successfully!', 'success');
      }

      setShowPackageModal(false);
      fetchAdminData();
    } catch (err) {
      showNotify(err.response?.data?.message || 'Failed to save package', 'error');
    }
  };

  // Delete Package
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this tour package?')) return;
    try {
      await axios.delete(`/api/v1/packages/${packageId}`);
      showNotify('Tour package deleted.', 'info');
      fetchAdminData();
    } catch (err) {
      showNotify('Failed to delete package.', 'error');
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`/api/v1/admin/bookings/${bookingId}/status`, {
        bookingStatus: status,
        paymentStatus: 'paid'
      });
      showNotify(`Booking status updated to ${status}`, 'success');
      fetchAdminData();
    } catch (err) {
      showNotify('Failed to update status', 'error');
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Remove this booking record?')) return;
    try {
      await axios.delete(`/api/v1/admin/bookings/${bookingId}`);
      showNotify('Booking record deleted.', 'info');
      fetchAdminData();
    } catch (err) {
      showNotify('Failed to delete booking.', 'error');
    }
  };

  if (loading && !stats) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Admin Command Center...</div>;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Admin Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage tour packages, reservations, analytics, and customer packages.</p>
        </div>

        <button onClick={handleOpenCreateModal} className="btn-gold" style={{ padding: '12px 24px' }}>
          <Plus size={18} /> Add New Tour Package
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-glass)', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'overview' ? '3px solid var(--accent-gold)' : '3px solid transparent',
            padding: '12px 20px',
            color: activeTab === 'overview' ? 'var(--accent-gold)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <LayoutDashboard size={18} /> Analytics Overview
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'packages' ? '3px solid var(--accent-gold)' : '3px solid transparent',
            padding: '12px 20px',
            color: activeTab === 'packages' ? 'var(--accent-gold)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={18} /> Manage Tour Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'bookings' ? '3px solid var(--accent-gold)' : '3px solid transparent',
            padding: '12px 20px',
            color: activeTab === 'bookings' ? 'var(--accent-gold)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Calendar size={18} /> Manage Bookings ({bookings.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div>
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign color="#fbbf24" size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Revenue</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatPrice(stats?.totalRevenue || 148500)}</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar color="#38bdf8" size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Bookings</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{bookings.length || stats?.totalBookings || 86}</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users color="#34d399" size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Active Users</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats?.totalUsers || 142}</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package color="#f472b6" size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Tour Packages</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{packages.length}</h3>
              </div>
            </div>
          </div>

          {/* Recharts Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }} className="charts-layout">
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>2026 Monthly Revenue ($ USD)</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.monthlyRevenueChart || []}>
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="revenue" fill="var(--accent-blue)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Category Share</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats?.categoryBreakdown || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {stats?.categoryBreakdown?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--bg-secondary)', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE TOUR PACKAGES (FULL CRUD) */}
      {activeTab === 'packages' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Tour Packages CRUD Manager</h3>
            <button onClick={handleOpenCreateModal} className="btn-gold" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              <Plus size={16} /> Create Package
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px' }}>Package Title</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Destination</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Duration</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'} alt="Thumb" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        {pkg.title}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge-pill badge-gold" style={{ fontSize: '0.7rem' }}>{pkg.category}</span>
                    </td>
                    <td style={{ padding: '16px' }}>{pkg.destination}</td>
                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--accent-gold)' }}>{formatPrice(pkg.discountPrice || pkg.price)}</td>
                    <td style={{ padding: '16px' }}>{pkg.durationDays}D / {pkg.durationNights}N</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenEditModal(pkg)} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#38bdf8', borderColor: '#38bdf8' }}>
                          <Edit2 size={14} /> Edit
                        </button>
                        <button onClick={() => handleDeletePackage(pkg._id)} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#f43f5e', borderColor: '#f43f5e' }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>Bookings CRUD Manager</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px' }}>Booking No</th>
                  <th style={{ padding: '12px' }}>Customer Name</th>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--accent-gold)' }}>{b.bookingNumber}</td>
                    <td style={{ padding: '16px' }}>{b.passengers?.[0]?.fullName || 'VIP Traveler'}</td>
                    <td style={{ padding: '16px' }}>{new Date(b.selectedDate || Date.now()).toLocaleDateString()}</td>
                    <td style={{ padding: '16px', fontWeight: 700 }}>{formatPrice(b.totalAmount || 1850)}</td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge-pill badge-emerald">{b.bookingStatus || 'confirmed'}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleUpdateBookingStatus(b._id, 'confirmed')} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#34d399', color: '#34d399' }}>
                          Approve
                        </button>
                        <button onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#f43f5e', color: '#f43f5e' }}>
                          Cancel
                        </button>
                        <button onClick={() => handleDeleteBooking(b._id)} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PACKAGE MODAL */}
      {showPackageModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px', background: 'var(--bg-secondary)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {editPackageId ? 'Edit Tour Package' : 'Create New Tour Package'}
              </h3>
              <button onClick={() => setShowPackageModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Package Title</label>
                <input type="text" required value={pkgForm.title} onChange={e => setPkgForm({ ...pkgForm, title: e.target.value })} placeholder="e.g. Swiss Alps & Glacier Express" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select value={pkgForm.category} onChange={e => setPkgForm({ ...pkgForm, category: e.target.value })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }}>
                    <option value="Luxury Tours" style={{ background: 'var(--bg-secondary)' }}>Luxury Tours</option>
                    <option value="Honeymoon Packages" style={{ background: 'var(--bg-secondary)' }}>Honeymoon Packages</option>
                    <option value="International Tours" style={{ background: 'var(--bg-secondary)' }}>International Tours</option>
                    <option value="Domestic Tours" style={{ background: 'var(--bg-secondary)' }}>Domestic Tours</option>
                    <option value="Family Tours" style={{ background: 'var(--bg-secondary)' }}>Family Tours</option>
                    <option value="Beach Holidays" style={{ background: 'var(--bg-secondary)' }}>Beach Holidays</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Country</label>
                  <input type="text" required value={pkgForm.country} onChange={e => setPkgForm({ ...pkgForm, country: e.target.value })} placeholder="e.g. Switzerland" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Destination Location</label>
                <input type="text" required value={pkgForm.destination} onChange={e => setPkgForm({ ...pkgForm, destination: e.target.value })} placeholder="e.g. Zermatt & St. Moritz" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Regular Price ($)</label>
                  <input type="number" required value={pkgForm.price} onChange={e => setPkgForm({ ...pkgForm, price: Number(e.target.value) })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Discounted Price ($)</label>
                  <input type="number" value={pkgForm.discountPrice} onChange={e => setPkgForm({ ...pkgForm, discountPrice: Number(e.target.value) })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Duration Days</label>
                  <input type="number" required value={pkgForm.durationDays} onChange={e => setPkgForm({ ...pkgForm, durationDays: Number(e.target.value) })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Duration Nights</label>
                  <input type="number" required value={pkgForm.durationNights} onChange={e => setPkgForm({ ...pkgForm, durationNights: Number(e.target.value) })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Cover Image URL</label>
                <input type="url" required value={pkgForm.images[0] || ''} onChange={e => setPkgForm({ ...pkgForm, images: [e.target.value] })} style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '12px' }}>
                {editPackageId ? 'Update Tour Package' : 'Publish Tour Package'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
