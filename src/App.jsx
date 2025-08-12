import { useState } from 'react'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import OrderPage from './components/OrderPage'
import ReportsPage from './components/ReportsPage'
import ContactPage from './components/ContactPage'
import AboutPage from './components/AboutPage'
import UserDashboard from './components/UserDashboard'

function App() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'app'
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard', 'order', 'reports', 'contact', 'about'
  const [userData, setUserData] = useState(null) // Store complete user data including role

  const handleLogin = (user) => {
    console.log('=== LOGIN DEBUG ===');
    console.log('User logged in:', user);
    setUserData(user)
    setCurrentView('app')
    // Set default page based on user role
    if (user.role === 'admin') {
      console.log('Setting admin dashboard');
      setCurrentPage('dashboard') // Admin sees full dashboard
    } else {
      console.log('Setting user dashboard');
      setCurrentPage('user-dashboard') // User sees limited dashboard
    }
    console.log('=== END LOGIN DEBUG ===');
  }

  const handleLogout = () => {
    setUserData(null)
    setCurrentView('login')
    setCurrentPage('dashboard')
  }

  const handlePageChange = (page) => {
    console.log('Page change requested:', page);
    setCurrentPage(page)
  }

  // Authentication views (no navigation)
  if (currentView === 'signup') {
    return (
      <SignupPage 
        onNavigateToLogin={() => setCurrentView('login')} 
      />
    )
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        onNavigateToSignup={() => setCurrentView('signup')}
        onLogin={handleLogin}
      />
    )
  }

  // Main application view (with navigation)
  const renderCurrentPage = () => {
    console.log('=== RENDER DEBUG ===');
    console.log('Current page:', currentPage);
    console.log('User data:', userData);
    console.log('User role:', userData?.role);
    
    try {
      switch (currentPage) {
        case 'dashboard':
          console.log('Rendering dashboard case');
          // Only admin can access full dashboard
          return userData?.role === 'admin' ? 
            <Dashboard userEmail={userData.email} onLogout={handleLogout} /> : 
            <UserDashboard userData={userData} onLogout={handleLogout} onPageChange={handlePageChange} />;
        
        case 'user-dashboard':
          console.log('Rendering user-dashboard case');
          // User's personalized dashboard
          console.log('Rendering UserDashboard for:', userData?.name);
          return <UserDashboard userData={userData} onLogout={handleLogout} onPageChange={handlePageChange} />;
        
        case 'order':
          console.log('Rendering order case');
          return <OrderPage userRole={userData?.role} />;
        
        case 'reports':
          console.log('Rendering reports case');
          // Only admin can access reports
          return userData?.role === 'admin' ? 
            <ReportsPage /> : 
            <UserDashboard userData={userData} onLogout={handleLogout} />;
        
        case 'contact':
          console.log('Rendering contact case');
          return <ContactPage />;
        
        case 'about':
          console.log('Rendering about case');
          return <AboutPage />;
        
        default:
          console.log('Default case hit for:', currentPage);
          return userData?.role === 'admin' ? 
            <Dashboard userEmail={userData.email} onLogout={handleLogout} /> : 
            <UserDashboard userData={userData} onLogout={handleLogout} onPageChange={handlePageChange} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return <div>Error loading dashboard: {error.message}</div>;
    }
  };

  console.log('=== APP RENDER ===');
  console.log('Current view:', currentView);
  console.log('Current page:', currentPage);
  console.log('User data:', userData);

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        userData={userData}
        onLogout={handleLogout}
      />
      <main className="main-content" style={{ minHeight: '100vh', display: 'block', padding: '20px' }}>
        {renderCurrentPage()}
      </main>
    </div>
  )
}

export default App
