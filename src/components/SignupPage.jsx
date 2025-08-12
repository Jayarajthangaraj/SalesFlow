import { useState } from 'react';
import './SignupPage.css';

const SignupPage = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Signup attempt:', {
                ...formData,
                password: '***hidden***',
                confirmPassword: '***hidden***'
            });
            
            // Show success message
            alert('Account created successfully! Welcome to SalesFlow Premium!\nRedirecting to login page...');
            
            // Clear form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            // Navigate to login page after a short delay
            setTimeout(() => {
                onNavigateToLogin();
            }, 1000);
            
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const PremiumLogo = () => (
        <div className="premium-logo">
            <div className="logo-icon">
                <svg viewBox="0 0 100 100" className="logo-svg">
                    <defs>
                        <linearGradient id="signupLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#646cff', stopOpacity: 1}} />
                            <stop offset="50%" style={{stopColor: '#747bff', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#535bf2', stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#signupLogoGradient)" />
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

    const getPasswordStrength = () => {
        const password = formData.password;
        if (password.length === 0) return { strength: 0, label: '' };
        
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z\d]/.test(password)) score++;
        
        const levels = [
            { strength: 1, label: 'Very Weak', color: '#ef4444' },
            { strength: 2, label: 'Weak', color: '#f97316' },
            { strength: 3, label: 'Fair', color: '#eab308' },
            { strength: 4, label: 'Good', color: '#22c55e' },
            { strength: 5, label: 'Strong', color: '#16a34a' }
        ];
        
        return levels[score - 1] || levels[0];
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="signup-container">
            <div className="signup-card">
                <PremiumLogo />
                
                <div className="signup-header">
                    <h2>Join SalesFlow Premium</h2>
                    <p>Create your account and unlock powerful sales tools</p>
                </div>

                <form onSubmit={handleSignup} className="signup-form">
                    <div className="name-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={errors.firstName ? 'error' : ''}
                                placeholder="John"
                                disabled={isLoading}
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={errors.lastName ? 'error' : ''}
                                placeholder="Doe"
                                disabled={isLoading}
                            />
                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
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
                            placeholder="john@example.com"
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={errors.password ? 'error' : ''}
                                placeholder="Create a strong password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {formData.password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill" 
                                        style={{
                                            width: `${(passwordStrength.strength / 5) * 100}%`,
                                            backgroundColor: passwordStrength.color
                                        }}
                                    ></div>
                                </div>
                                <span className="strength-label" style={{color: passwordStrength.color}}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                        )}
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="signup-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="loading-spinner"></div>
                                Creating Account...
                            </>
                        ) : (
                            'Create Premium Account'
                        )}
                    </button>
                </form>

                <div className="signup-footer">
                    <p className="terms-text">
                        By creating an account, you agree to our{' '}
                        <a href="#terms">Terms of Service</a> and{' '}
                        <a href="#privacy">Privacy Policy</a>
                    </p>
                    <p className="login-link">
                        Already have an account? <button type="button" className="link-button" onClick={onNavigateToLogin}>Sign in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage; 