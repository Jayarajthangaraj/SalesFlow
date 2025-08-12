import { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onNavigateToSignup, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default to user role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo authentication logic
      console.log('Login attempt:', {
        role: formData.role,
        email: formData.email,
        passwordLength: formData.password.length
      });

      const isAdminLogin = formData.role === 'admin' && 
                          formData.email.toLowerCase().includes('admin') && 
                          formData.password === 'admin123';
      
      const isUserLogin = formData.role === 'user' && 
                         formData.password.length >= 6;

      console.log('Auth results:', { isAdminLogin, isUserLogin });

      if (isAdminLogin || isUserLogin) {
        // Extract name from email or generate a friendly name
        const generateNameFromEmail = (email) => {
          const username = email.split('@')[0];
          
          // Convert common patterns to readable names
          let cleanName = username
            .replace(/[._-]/g, ' ') // Replace dots, underscores, dashes with spaces
            .replace(/\d+/g, '') // Remove numbers
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim();
          
          // Handle edge cases
          if (cleanName.length < 2) {
            return 'Valued Customer';
          }
          
          // Capitalize first letter of each word
          const formattedName = cleanName
            .split(' ')
            .filter(word => word.length > 0) // Remove empty words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          return formattedName || 'Valued Customer';
        };

        // Pass user data including role to parent component
        onLogin({
          email: formData.email,
          role: formData.role,
          name: formData.role === 'admin' ? 'Admin User' : generateNameFromEmail(formData.email)
        });
      } else {
        if (formData.role === 'admin') {
          if (!formData.email.toLowerCase().includes('admin')) {
            alert('❌ Admin access denied. Email must contain "admin"');
          } else if (formData.password !== 'admin123') {
            alert('❌ Admin access denied. Password must be "admin123"');
          } else {
            alert('❌ Admin access denied. Check your credentials.');
          }
        } else {
          if (formData.password.length < 6) {
            alert('❌ User login failed. Password must be at least 6 characters long.');
          } else {
            alert('❌ User login failed. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('📧 Password reset link sent to your email address!');
      setShowForgotPassword(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      alert('❌ Error sending reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PremiumLogo = () => (
    <div className="premium-logo">
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" className="logo-svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#646cff', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#747bff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#535bf2', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
          <polygon points="35,65 50,35 65,65" fill="white" />
          <circle cx="50" cy="30" r="8" fill="white" />
        </svg>
      </div>
      <div className="logo-text">
        <h1>SalesFlow</h1>
        <span className="premium-badge">PREMIUM</span>
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <PremiumLogo />
        
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your premium interior design account</p>
        </div>

        <form onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} className="login-form">
          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">Login As</label>
            <div className="role-selector">
              <label className={`role-option ${formData.role === 'user' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleInputChange}
                />
                <div className="role-card">
                  <div className="role-icon">👤</div>
                  <div className="role-info">
                    <h4>Customer</h4>
                    <p>Browse and place orders</p>
                    <small style={{fontSize: '0.7rem', color: '#666'}}>Any email + 6+ char password</small>
                  </div>
                </div>
              </label>
              <label className={`role-option ${formData.role === 'admin' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleInputChange}
                />
                <div className="role-card">
                  <div className="role-icon">👑</div>
                  <div className="role-info">
                    <h4>Admin</h4>
                    <p>Manage orders & reports</p>
                    <small style={{fontSize: '0.7rem', color: '#666'}}>Email with "admin" + password "admin123"</small>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder={formData.role === 'admin' ? 'admin@salesflow.com' : 'your.email@example.com'}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {!showForgotPassword && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder={formData.role === 'admin' ? 'admin123' : 'Enter your password'}
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                {showForgotPassword ? 'Sending...' : 'Signing In...'}
              </>
            ) : (
              showForgotPassword ? 'Send Reset Link' : `Sign In as ${formData.role === 'admin' ? 'Admin' : 'Customer'}`
            )}
          </button>

          {!showForgotPassword && (
            <div className="form-footer">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </button>
            </div>
          )}

          {showForgotPassword && (
            <div className="form-footer">
              <button
                type="button"
                className="back-to-login-link"
                onClick={() => setShowForgotPassword(false)}
              >
                ← Back to Sign In
              </button>
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button onClick={onNavigateToSignup} className="link-button">
            Create Premium Account
          </button>
        </div>

        {/* Demo Credentials Helper */}
        <div className="demo-credentials">
          <h4>🔐 Demo Credentials</h4>
          <div className="credentials-grid">
            <div className="credential-item">
              <strong>Customer Login:</strong>
              <span>Try: john.doe@email.com + password123</span>
            </div>
            <div className="credential-item">
              <strong>Admin Login:</strong>
              <span>admin@salesflow.com / admin123</span>
            </div>
            <div className="credential-item">
              <strong>Name Examples:</strong>
              <span>priya.sharma@gmail.com → "Priya Sharma"</span>
            </div>
            <div className="credential-item">
              <strong>More Examples:</strong>
              <span>rahul_kumar@yahoo.com → "Rahul Kumar"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;