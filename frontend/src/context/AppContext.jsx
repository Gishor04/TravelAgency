import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('aura_lang') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('aura_theme') || 'dark');
  const [currency, setCurrency] = useState(localStorage.getItem('aura_currency') || 'USD');
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('aura_wishlist')) || []);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aura_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('aura_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleWishlist = (packageId) => {
    setWishlist(prev => {
      if (prev.includes(packageId)) {
        showNotify('Removed from Wishlist', 'info');
        return prev.filter(id => id !== packageId);
      } else {
        showNotify('Saved to Wishlist!', 'success');
        return [...prev, packageId];
      }
    });
  };

  const showNotify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const formatPrice = (usdPrice) => {
    const rates = { USD: 1, EUR: 0.92, LKR: 305, INR: 83.5, GBP: 0.78 };
    const symbols = { USD: '$', EUR: '€', LKR: 'LKR ', INR: '₹', GBP: '£' };
    const rate = rates[currency] || 1;
    const symbol = symbols[currency] || '$';
    return `${symbol}${(usdPrice * rate).toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        currency,
        setCurrency,
        wishlist,
        toggleWishlist,
        notification,
        showNotify,
        t,
        formatPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
