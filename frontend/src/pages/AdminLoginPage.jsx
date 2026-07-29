import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { adminLogin } = useAuth();
  const { showNotify } = useApp();
  const navigate = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      showNotify('Admin Authentication Successful!', 'success');
      navigate('/admin');
    } catch (err) {
      showNotify(err.response?.data?.message || 'Admin login failed. Invalid credentials or privileges.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '70px auto', padding: '0 20px' }}>
      
      <div className="glass-panel" style={{ padding: '40px', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)' }}>
            <ShieldCheck color="#000" size={32} />
          </div>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>Admin Command Center</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Restricted access for certified travel administrators</p>
        </div>

        <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Admin Email</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px' }}>
              <Mail size={18} color="var(--accent-gold)" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter admin email"
                style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Secret Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px' }}>
              <Lock size={18} color="var(--accent-gold)" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter secret password"
                style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '8px' }}>
            {loading ? 'Authenticating Admin Portal...' : 'Access Admin Panel'} <ArrowRight size={18} />
          </button>

        </form>

      </div>

    </div>
  );
}
