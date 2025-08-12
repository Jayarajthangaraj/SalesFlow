import { useState } from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onPageChange, userData, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Different navigation items based on user role
  const getNavigationItems = () => {
    if (userData?.role === 'admin') {
      // Admin gets full access
      return [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'order', label: 'Orders', icon: '🛋️' },
        { id: 'reports', label: 'Reports', icon: '📈' },
        { id: 'contact', label: 'Contact Us', icon: '📞' },
        { id: 'about', label: 'About Us', icon: 'ℹ️' }
      ];
    } else {
      // Regular users get limited access
      return [
        { id: 'user-dashboard', label: 'Home', icon: '🏠' },
        { id: 'about', label: 'About Us', icon: 'ℹ️' },
        { id: 'contact', label: 'Contact Us', icon: '📞' }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  const PremiumLogo = () => (
    <div className="nav-logo">
      <div className="nav-logo-icon">
        <svg viewBox="0 0 100 100" className="nav-logo-svg">
          <defs>
            <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#646cff', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#747bff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#535bf2', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#navLogoGradient)" />
          <polygon points="35,65 50,35 65,65" fill="white" />
          <circle cx="50" cy="30" r="8" fill="white" />
        </svg>
      </div>
      <div className="nav-logo-text">
        <h2>SalesFlow</h2>
        <span className="nav-premium-badge">PREMIUM</span>
      </div>
    </div>
  );

  return (
    <nav className="navigation">
      <div className="nav-container">
        <PremiumLogo />
        
        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* User Info & Actions */}
        <div className="nav-user">
          <div className="nav-user-info">
            <span className="nav-user-email">{userData?.email}</span>
            <div className="nav-user-role">
              <span className={`role-badge ${userData?.role}`}>
                {userData?.role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
            </div>
          </div>
          <button className="nav-logout" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-menu">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-mobile-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                onPageChange(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="nav-mobile-user">
            <div className="nav-mobile-user-info">
              <span className="nav-mobile-email">{userData?.email}</span>
              <span className={`role-badge ${userData?.role}`}>
                {userData?.role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
            </div>
            <button className="nav-mobile-logout" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 