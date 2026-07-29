import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CreditCard, CheckCircle2, FileText, Lock, Gift, User, Phone, Mail, ArrowRight } from 'lucide-react';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatPrice, showNotify } = useApp();

  const bookingState = location.state || {
    packageId: 'pkg_101',
    packageTitle: 'Bali Luxury Villa & Tropical Island Odyssey',
    selectedDate: '2026-08-15',
    adults: 2,
    children: 0,
    totalPrice: 3198
  };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [paymentType, setPaymentType] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'AURA2026' || couponCode.toUpperCase() === 'LUXURY20') {
      const disc = Math.round(bookingState.totalPrice * 0.15);
      setDiscount(disc);
      setCouponApplied(true);
      showNotify('15% VIP Discount Applied!', 'success');
    } else {
      showNotify('Invalid coupon code', 'error');
    }
  };

  const finalAmount = bookingState.totalPrice - discount;
  const amountToPay = paymentType === 'deposit' ? Math.round(finalAmount * 0.3) : finalAmount;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/bookings', {
        packageId: bookingState.packageId,
        selectedDate: bookingState.selectedDate,
        adults: bookingState.adults,
        children: bookingState.children,
        passengers: [{ fullName, email, phone, passportNumber }],
        paymentType,
        paymentMethod,
        couponCode: couponApplied ? couponCode : ''
      });

      setConfirmation(res.data);
      showNotify('Booking Confirmed! WhatsApp alert sent.', 'success');
    } catch (err) {
      showNotify('Error confirming booking', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <CheckCircle2 size={40} color="#34d399" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Booking Confirmed!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Confirmation No: <strong style={{ color: 'var(--accent-gold)' }}>{confirmation.booking.bookingNumber}</strong>
          </p>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Invoice & Payment Summary</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span>Tour Package:</span> <strong>{bookingState.packageTitle}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span>Travelers:</span> <span>{bookingState.adults} Adults, {bookingState.children} Children</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span>Total Package Cost:</span> <strong>{formatPrice(finalAmount)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#34d399' }}>
              <span>Amount Paid Today:</span> <strong>{formatPrice(amountToPay)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-gold)' }}>
              <span>Balance Due at Check-in:</span> <strong>{formatPrice(finalAmount - amountToPay)}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => window.print()} className="btn-gold">
              <FileText size={18} /> Print Invoice (PDF)
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-outline">
              Go to My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>
        Secure 2026 Reservation
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }} className="booking-layout">
        
        {/* Form Details */}
        <form onSubmit={handleConfirmBooking} className="glass-panel" style={{ padding: '32px' }}>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="var(--accent-gold)" /> Primary Traveler Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 123 4567" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Passport Number</label>
              <input type="text" required value={passportNumber} onChange={e => setPassportNumber(e.target.value)} placeholder="A12345678" style={{ width: '100%', background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', color: 'var(--text-primary)' }} />
            </div>
          </div>

          {/* Payment Type Selection */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} color="var(--text-accent)" /> Payment Option
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div onClick={() => setPaymentType('full')} className="glass-card" style={{ padding: '16px', cursor: 'pointer', border: paymentType === 'full' ? '2px solid var(--accent-gold)' : '1px solid var(--border-glass)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Full Payment</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pay 100% now & lock price</p>
            </div>
            <div onClick={() => setPaymentType('deposit')} className="glass-card" style={{ padding: '16px', cursor: 'pointer', border: paymentType === 'deposit' ? '2px solid var(--accent-gold)' : '1px solid var(--border-glass)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>30% Deposit Option</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pay 30% deposit now, balance on arrival</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
            {loading ? 'Processing Secure Transaction...' : `Confirm & Pay ${formatPrice(amountToPay)}`}
          </button>

        </form>

        {/* Order Summary */}
        <aside className="glass-panel" style={{ padding: '28px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Booking Summary</h3>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>{bookingState.packageTitle}</p>
          
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)', marginBottom: '16px' }}>
            <div>Date: {bookingState.selectedDate}</div>
            <div>Travelers: {bookingState.adults} Adults, {bookingState.children} Children</div>
          </div>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input type="text" placeholder="Promo Code (e.g. AURA2026)" value={couponCode} onChange={e => setCouponCode(e.target.value)} style={{ flexGrow: 1, background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }} />
            <button type="submit" className="btn-outline" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>Apply</button>
          </form>

          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#34d399', fontSize: '0.9rem' }}>
              <span>VIP Discount (15%):</span> <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-glass)' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total Amount</span>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--accent-gold)' }}>{formatPrice(finalAmount)}</span>
          </div>
        </aside>

      </div>
    </div>
  );
}
