import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { useApp } from './context/AppContext';

import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import AIPlannerPage from './pages/AIPlannerPage';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const { notification } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Alert */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            background: notification.type === 'success' ? '#10b981' : notification.type === 'error' ? '#f43f5e' : '#2563eb',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: 600,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content View */}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:identifier" element={<PackageDetail />} />
          <Route path="/ai-planner" element={<AIPlannerPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          
          {/* Protected Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      {/* Persistent AI Assistant */}
      <AIChatbot />

      {/* Footer */}
      <Footer />

    </div>
  );
}
