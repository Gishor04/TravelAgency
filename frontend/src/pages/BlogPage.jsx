import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/v1/content/blogs');
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge-pill badge-gold" style={{ marginBottom: '12px' }}>2026 JOURNAL</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Travel Insights & Visa Guides
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Expert packing checklists, high-altitude alpine resort secrets, and global visa guidelines.</p>
      </div>

      <div className="grid-container">
        {blogs.map(b => (
          <div key={b._id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <span className="badge-pill badge-blue" style={{ marginBottom: '12px' }}>{b.category}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>{b.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{b.content}</p>
              </div>
            </div>
            <div style={{ padding: '0 24px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {b.readTime}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-accent)', fontWeight: 600 }}>Read Full Guide →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
