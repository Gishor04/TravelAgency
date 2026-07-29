import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import TourCard from '../components/TourCard';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistPackages();
  }, [wishlist]);

  const fetchWishlistPackages = async () => {
    try {
      const res = await axios.get('/api/v1/packages');
      const allPkgs = res.data.packages || [];
      const filtered = allPkgs.filter(p => wishlist.includes(p._id));
      setPackages(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Heart color="#f43f5e" fill="#f43f5e" /> Saved Wishlist
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>You have saved {packages.length} luxury tour packages to your wishlist.</p>
      </div>

      {loading ? (
        <div>Loading saved trips...</div>
      ) : packages.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
          <h3>Your Wishlist is empty.</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Explore tour packages and click the heart icon to save your favorite destinations!</p>
        </div>
      ) : (
        <div className="grid-container">
          {packages.map(pkg => (
            <TourCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
