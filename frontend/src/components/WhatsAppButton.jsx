import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton({ phoneNumber = '+94771234567', message = 'Hello Globevia Travel 2026! I would like to inquire about luxury tour packages.' }) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 999,
        background: '#25D366',
        color: '#fff',
        borderRadius: '9999px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 25px rgba(37,211,102,0.4)',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '0.95rem'
      }}
    >
      <MessageSquare size={20} fill="#fff" />
      <span>WhatsApp Concierge</span>
    </a>
  );
}
