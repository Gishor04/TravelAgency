import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Compass, Globe, Moon, Sun, Heart, User, ShieldCheck, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme, currency, setCurrency, wishlist, t } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '16px 5%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Brand Logo */}
        <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--accent-gradient)', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(37,99,235,0.4)' }}>
            <Compass color="#fff" size={26} />
          </div>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GLOBEVIA
            </span>
            <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.15em' }}>
              TRAVEL 2026
            </span>
          </div>
        </RouterLink>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          <RouterLink to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>{t('navHome')}</RouterLink>
          <RouterLink to="/packages" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>{t('navPackages')}</RouterLink>
          <RouterLink to="/ai-planner" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} /> {t('navAIPlanner')}
          </RouterLink>
          <RouterLink to="/blogs" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>{t('navBlog')}</RouterLink>
          <RouterLink to="/contact" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>{t('navContact')}</RouterLink>
          
          {/* Admin Portal Link */}
          <RouterLink
            to="/admin"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            <ShieldCheck size={16} /> Admin Portal
          </RouterLink>
        </nav>

        {/* Right Action Icons & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Multi-Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-glass-card)', padding: '6px 12px', borderRadius: '9999px', border: '1px solid var(--border-glass)' }}>
            <Globe size={16} color="var(--text-accent)" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
            >
              <option value="en" style={{ background: 'var(--bg-secondary)' }}>EN</option>
              <option value="ta" style={{ background: 'var(--bg-secondary)' }}>தமிழ்</option>
              <option value="si" style={{ background: 'var(--bg-secondary)' }}>සිංහල</option>
            </select>
          </div>

          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
          >
            <option value="USD" style={{ background: 'var(--bg-secondary)' }}>USD ($)</option>
            <option value="EUR" style={{ background: 'var(--bg-secondary)' }}>EUR (€)</option>
            <option value="LKR" style={{ background: 'var(--bg-secondary)' }}>LKR</option>
            <option value="INR" style={{ background: 'var(--bg-secondary)' }}>INR (₹)</option>
            <option value="GBP" style={{ background: 'var(--bg-secondary)' }}>GBP (£)</option>
          </select>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{ background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#2563eb" />}
          </button>

          {/* Wishlist Link */}
          <RouterLink to="/wishlist" style={{ position: 'relative', color: 'var(--text-primary)' }}>
            <Heart size={22} color={wishlist.length > 0 ? '#f43f5e' : 'currentColor'} fill={wishlist.length > 0 ? '#f43f5e' : 'none'} />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#f43f5e', color: '#fff', fontSize: '0.7rem', fontWeight: 700, borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </RouterLink>

          {/* User Auth Buttons */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RouterLink to="/dashboard" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <User size={16} /> {user.name.split(' ')[0]} {user.role === 'admin' && '(Admin)'}
              </RouterLink>
              <button onClick={logout} className="btn-outline" style={{ padding: '8px 14px', fontSize: '0.85rem', borderColor: '#f43f5e', color: '#f43f5e' }}>
                Logout
              </button>
            </div>
          ) : (
            <RouterLink to="/login" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Sign In
            </RouterLink>
          )}

        </div>
      </div>
    </header>
  );
}
