import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { LogIn, UserPlus, Compass, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const { login, register } = useAuth();
  const { showNotify } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(name, email, password, phone);
        showNotify('Registration successful! Welcome to Aura 2026.', 'success');
      } else {
        await login(email, password);
        showNotify('Signed in successfully!', 'success');
      }
      navigate('/dashboard');
    } catch (err) {
      showNotify(err.response?.data?.message || 'Authentication error', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '60px auto', padding: '0 20px' }}>
      
      <div className="glass-panel" style={{ padding: '36px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ background: 'var(--accent-gradient)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
            <Compass color="#fff" size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{isRegister ? 'Create VIP Account' : 'Sign In to Aura'}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Access your itineraries, bookings, and VIP concierge</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Sophia Martinez" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="sophia@example.com" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
          </div>

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 0192" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
          )}

          <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}>
            {isRegister ? 'Complete Registration' : 'Sign In'}
          </button>

          {/* Google OAuth Simulation Button */}
          <button
            type="button"
            onClick={() => {
              login('sophia@example.com', 'password123');
              showNotify('Google OAuth Sign In Successful!', 'success');
              navigate('/dashboard');
            }}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
          >
            Continue with Google
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} style={{ background: 'transparent', border: 'none', color: 'var(--text-accent)', fontWeight: 700, cursor: 'pointer' }}>
            {isRegister ? 'Sign In' : 'Register Now'}
          </button>
        </div>

      </div>

    </div>
  );
}
