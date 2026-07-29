import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { Filter, Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '4000');
  const [tourType, setTourType] = useState('');

  useEffect(() => {
    fetchFilteredPackages();
  }, [category, country, maxPrice, tourType]);

  const fetchFilteredPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (country) params.append('country', country);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (tourType) params.append('tourType', tourType);

      const res = await axios.get(`/api/v1/packages?${params.toString()}`);
      setPackages(res.data.packages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredPackages();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Explore 2026 Luxury Tour Packages
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Discover handpicked 5-star villas, alpine rails, island honeymoons, and private chauffeur expeditions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }} className="packages-layout">
        
        {/* Sidebar Filter Controls */}
        <aside className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} color="var(--accent-gold)" /> Filters
            </span>
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setCountry('');
                setMaxPrice('4000');
                setTourType('');
              }}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-accent)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset All
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Search Keyword</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-glass-card)', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <Search size={16} color="var(--text-secondary)" />
              <input
                type="text"
                placeholder="Title, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '0.85rem' }}
              />
            </div>
          </form>

          {/* Category Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Tour Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="" style={{ background: 'var(--bg-secondary)' }}>All Categories</option>
              <option value="Luxury Tours" style={{ background: 'var(--bg-secondary)' }}>Luxury Tours</option>
              <option value="Honeymoon Packages" style={{ background: 'var(--bg-secondary)' }}>Honeymoon Packages</option>
              <option value="International Tours" style={{ background: 'var(--bg-secondary)' }}>International Tours</option>
              <option value="Domestic Tours" style={{ background: 'var(--bg-secondary)' }}>Domestic Heritage</option>
              <option value="Family Tours" style={{ background: 'var(--bg-secondary)' }}>Family Tours</option>
            </select>
          </div>

          {/* Country Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '12px', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="" style={{ background: 'var(--bg-secondary)' }}>All Countries</option>
              <option value="Indonesia" style={{ background: 'var(--bg-secondary)' }}>Indonesia (Bali)</option>
              <option value="Switzerland" style={{ background: 'var(--bg-secondary)' }}>Switzerland</option>
              <option value="Sri Lanka" style={{ background: 'var(--bg-secondary)' }}>Sri Lanka</option>
              <option value="Maldives" style={{ background: 'var(--bg-secondary)' }}>Maldives</option>
              <option value="Japan" style={{ background: 'var(--bg-secondary)' }}>Japan</option>
            </select>
          </div>

          {/* Budget Range Slider */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Max Price</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
            />
          </div>

        </aside>

        {/* Package Grid */}
        <main>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
              <RefreshCw size={24} className="spin" /> Loading Packages...
            </div>
          ) : packages.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
              <h3>No tour packages match your filters.</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Try clearing your search keyword or increasing your budget range.</p>
            </div>
          ) : (
            <div className="grid-container">
              {packages.map((pkg) => (
                <TourCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
