import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Bot, MessageSquare, Send, X, Sparkles, User, RefreshCw } from 'lucide-react';

export default function AIChatbot() {
  const { lang, t } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Greetings! I am your Aura 2026 AI Travel Concierge. How may I assist your itinerary, visa, or luxury destination queries today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  const handleSend = async (customMsg) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    if (!customMsg) setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/ai/chat', {
        message: textToSend,
        language: lang
      });

      setMessages([...newMsgs, { role: 'assistant', text: res.data.reply }]);
    } catch (err) {
      setMessages([...newMsgs, { role: 'assistant', text: 'I am currently operating in offline mode. Please feel free to ask about Bali, Swiss Alps, Sri Lanka, or Visa guides!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: 'var(--accent-gradient)',
          color: '#fff',
          border: 'none',
          borderRadius: '9999px',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(37,99,235,0.5)',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        <Sparkles size={20} color="#fbbf24" />
        <span style={{ fontSize: '0.95rem' }}>AI Concierge</span>
      </button>

      {/* Floating Drawer Window */}
      {open && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '380px',
            maxHeight: '520px',
            height: '80vh',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px', background: 'var(--bg-glass-card)', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Aura 2026 AI Assistant</h4>
                <span style={{ fontSize: '0.75rem', color: '#34d399' }}>● Online Concierge</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: m.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  background: m.role === 'user' ? 'var(--accent-gradient)' : 'var(--bg-glass-card)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border-glass)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: '#fff'
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} className="spin" /> AI Assistant is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '8px 16px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.2)' }}>
            {['Visa Guidance', 'Best Time for Bali', 'Packing Checklist'].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'var(--bg-glass-card)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-accent)',
                  cursor: 'pointer'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: '12px', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask travel questions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flexGrow: 1, background: 'var(--bg-glass-card)', border: '1px solid var(--border-glass)', borderRadius: '9999px', padding: '10px 16px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
            />
            <button type="submit" className="btn-primary" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', justifyContent: 'center' }}>
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
