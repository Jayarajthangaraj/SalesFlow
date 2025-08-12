import { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = ({ userData, onLogout, onPageChange }) => {
  console.log('=== USERDASHBOARD DEBUG ===');
  console.log('UserDashboard rendering with userData:', userData);
  
  try {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactAction, setContactAction] = useState(null);
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showPortfolio, setShowPortfolio] = useState(false);

    // User-specific project data (in a real app, this would come from an API)
    const getUserProjects = () => {
      console.log('Getting user projects...');
      return [
        {
          id: 'PRJ001',
          title: 'Living Room Makeover',
          type: 'Residential',
          status: 'In Progress',
          progress: 65,
          startDate: '2024-01-15',
          expectedCompletion: '2024-02-28',
          budget: '₹2,50,000',
          currentPhase: 'Interior Work',
          nextMilestone: 'Furniture Installation',
          description: 'Complete renovation of living room with modern design elements',
          designer: 'Priya Sharma',
          designerEmail: 'priya.sharma@salesflow.com',
          designerPhone: '+91 98765 43210',
          projectManager: 'Raj Kumar',
          projectManagerPhone: '+91 98765 43211',
          address: '123 Green Park, New Delhi',
          propertySize: '1,200 sq ft',
          rooms: ['Living Room', 'Dining Area', 'Balcony'],
          materials: ['Premium Wood', 'Italian Marble', 'Smart Lighting'],
          timeline: '6 weeks',
          paymentStatus: '60% Paid',
          nextPayment: '₹1,00,000 (Due: 2024-02-15)',
          updates: [
            { date: '2024-01-20', message: 'Design approval completed', status: 'completed' },
            { date: '2024-01-25', message: 'Material procurement started', status: 'completed' },
            { date: '2024-02-01', message: 'Interior work in progress', status: 'in-progress' },
            { date: '2024-02-10', message: 'Furniture installation scheduled', status: 'upcoming' }
          ],
          documents: [
            { name: 'Design Contract.pdf', type: 'contract' },
            { name: 'Material List.xlsx', type: 'specification' },
            { name: 'Payment Schedule.pdf', type: 'financial' },
            { name: 'Project Timeline.pdf', type: 'timeline' }
          ]
        },
        {
          id: 'PRJ002',
          title: 'Kitchen Renovation',
          type: 'Residential',
          status: 'Planning',
          progress: 20,
          startDate: '2024-02-01',
          expectedCompletion: '2024-04-15',
          budget: '₹4,80,000',
          currentPhase: 'Design Approval',
          nextMilestone: 'Material Selection',
          description: 'Complete kitchen overhaul with modular design and smart appliances',
          designer: 'Amit Patel',
          designerEmail: 'amit.patel@salesflow.com',
          designerPhone: '+91 98765 43212',
          projectManager: 'Sneha Reddy',
          projectManagerPhone: '+91 98765 43213',
          address: '456 Sunshine Apartments, Mumbai',
          propertySize: '800 sq ft',
          rooms: ['Kitchen', 'Utility Area'],
          materials: ['Modular Kitchen', 'Quartz Countertop', 'Smart Appliances'],
          timeline: '10 weeks',
          paymentStatus: '20% Paid',
          nextPayment: '₹1,92,000 (Due: 2024-02-20)',
          updates: [
            { date: '2024-02-01', message: 'Initial consultation completed', status: 'completed' },
            { date: '2024-02-05', message: 'Design proposal submitted', status: 'completed' },
            { date: '2024-02-10', message: 'Awaiting design approval', status: 'pending' },
            { date: '2024-02-15', message: 'Material selection meeting', status: 'upcoming' }
          ],
          documents: [
            { name: 'Kitchen Design.pdf', type: 'design' },
            { name: 'Appliance List.pdf', type: 'specification' },
            { name: 'Payment Terms.pdf', type: 'financial' }
          ]
        },
        {
          id: 'PRJ003',
          title: 'Home Office Setup',
          type: 'Residential',
          status: 'Completed',
          progress: 100,
          startDate: '2023-11-01',
          expectedCompletion: '2023-12-20',
          budget: '₹1,20,000',
          currentPhase: 'Completed',
          nextMilestone: 'Project Closed',
          description: 'Ergonomic home office design with storage solutions',
          designer: 'Kavya Singh',
          designerEmail: 'kavya.singh@salesflow.com',
          designerPhone: '+91 98765 43214',
          projectManager: 'Vikram Mehta',
          projectManagerPhone: '+91 98765 43215',
          address: '789 Tech Park, Bangalore',
          propertySize: '300 sq ft',
          rooms: ['Home Office', 'Storage Area'],
          materials: ['Ergonomic Furniture', 'LED Lighting', 'Storage Units'],
          timeline: '4 weeks',
          paymentStatus: '100% Paid',
          nextPayment: 'Completed',
          updates: [
            { date: '2023-11-01', message: 'Project initiated', status: 'completed' },
            { date: '2023-11-15', message: 'Furniture installation completed', status: 'completed' },
            { date: '2023-12-01', message: 'Lighting setup completed', status: 'completed' },
            { date: '2023-12-20', message: 'Project completed and handed over', status: 'completed' }
          ],
          documents: [
            { name: 'Completion Certificate.pdf', type: 'completion' },
            { name: 'Warranty Card.pdf', type: 'warranty' },
            { name: 'Final Invoice.pdf', type: 'financial' }
          ]
        }
      ];
    };

    const userProjects = getUserProjects();
    console.log('User projects loaded:', userProjects.length);

    const getStatusColor = (status) => {
      switch (status) {
        case 'Completed': return '#22c55e';
        case 'In Progress': return '#f59e0b';
        case 'Planning': return '#646cff';
        case 'On Hold': return '#ef4444';
        default: return '#6b7280';
      }
    };

    const getProgressColor = (progress) => {
      if (progress >= 80) return '#22c55e';
      if (progress >= 50) return '#f59e0b';
      return '#646cff';
    };

    // Company values
    const companyValues = [
      {
        icon: '✨',
        title: 'Innovation',
        description: 'We stay ahead of design trends and incorporate cutting-edge technology in our projects.',
        color: '#646cff'
      },
      {
        icon: '🤝',
        title: 'Collaboration',
        description: 'We work closely with clients to understand their vision and bring it to reality.',
        color: '#22c55e'
      },
      {
        icon: '🏆',
        title: 'Quality',
        description: 'We never compromise on quality and deliver exceptional results every time.',
        color: '#f59e0b'
      },
      {
        icon: '🌱',
        title: 'Sustainability',
        description: 'We prioritize eco-friendly materials and sustainable design practices.',
        color: '#10b981'
      },
      {
        icon: '💡',
        title: 'Creativity',
        description: 'Every space tells a story. We craft unique designs that reflect your personality.',
        color: '#8b5cf6'
      },
      {
        icon: '⏰',
        title: 'Timely Delivery',
        description: 'We respect your time and ensure projects are completed within agreed timelines.',
        color: '#ef4444'
      }
    ];

    // Project statistics by year
    const projectStats = {
      2019: { completed: 45, revenue: '₹2.1 Crores', satisfaction: '92%', cities: 8 },
      2020: { completed: 62, revenue: '₹3.5 Crores', satisfaction: '94%', cities: 12 },
      2021: { completed: 89, revenue: '₹5.2 Crores', satisfaction: '96%', cities: 15 },
      2022: { completed: 124, revenue: '₹7.8 Crores', satisfaction: '97%', cities: 18 },
      2023: { completed: 148, revenue: '₹10.2 Crores', satisfaction: '98%', cities: 22 },
      2024: { completed: 87, revenue: '₹6.8 Crores', satisfaction: '99%', cities: 25 }
    };

    const currentStats = projectStats[selectedYear] || projectStats[2024];

    // Company roadmap from start to present
    const roadmapMilestones = [
      {
        year: 2018,
        title: 'SalesFlow Premium Founded',
        description: 'Started our journey with a vision to transform Indian homes with premium interior design',
        phase: 'foundation'
      },
      {
        year: 2019,
        title: 'First 50 Projects Completed',
        description: 'Successfully delivered our first 50 residential projects across Mumbai and Delhi',
        phase: 'growth'
      },
      {
        year: 2020,
        title: 'Pan-India Expansion',
        description: 'Expanded operations to 12 major Indian cities despite pandemic challenges',
        phase: 'expansion'
      },
      {
        year: 2021,
        title: 'Digital Transformation',
        description: 'Launched virtual consultations and 3D design previews for enhanced customer experience',
        phase: 'innovation'
      },
      {
        year: 2022,
        title: 'Sustainable Design Initiative',
        description: 'Pioneered eco-friendly materials and green design practices across all projects',
        phase: 'sustainability'
      },
      {
        year: 2023,
        title: '1000+ Homes Milestone',
        description: 'Celebrated transforming over 1000 homes with 98% customer satisfaction rate',
        phase: 'achievement'
      },
      {
        year: 2024,
        title: 'Industry Leadership',
        description: 'Recognized as Best Interior Design Firm with 25+ cities presence and premium services',
        phase: 'leadership'
      }
    ];

    // Featured project categories
    const projectCategories = [
      {
        name: 'Residential',
        count: '850+',
        icon: '🏠',
        description: 'Homes, apartments & villas',
        color: '#646cff'
      },
      {
        name: 'Commercial',
        count: '200+',
        icon: '🏢',
        description: 'Offices, retail & hospitality',
        color: '#22c55e'
      },
      {
        name: 'Luxury',
        count: '150+',
        icon: '💎',
        description: 'Premium & high-end projects',
        color: '#f59e0b'
      },
      {
        name: 'Budget-Friendly',
        count: '400+',
        icon: '💰',
        description: 'Quality designs within budget',
        color: '#10b981'
      },
      {
        name: 'Kitchen & Bath',
        count: '320+',
        icon: '🍳',
        description: 'Kitchens & bathroom renovations',
        color: '#f97316'
      },
      {
        name: 'Renovation',
        count: '275+',
        icon: '🔨',
        description: 'Complete home makeovers',
        color: '#8b5cf6'
      }
    ];

    // Handle category click to show images
    const handleCategoryClick = (category) => {
      console.log('Category clicked:', category.name);
      // For now, just log the click - we can add modal functionality later
    };

    // Handle project details modal
    const handleViewDetails = (project) => {
      setSelectedProject(project);
      setShowProjectDetails(true);
    };

    const handleContactDesigner = (project) => {
      setSelectedProject(project);
      setContactAction('contact-designer');
      setShowContactModal(true);
    };

    const closeProjectDetails = () => {
      setShowProjectDetails(false);
      setSelectedProject(null);
    };

    const handleContactAction = (action) => {
      setContactAction(action);
      setShowContactModal(true);
    };

    const closeContactModal = () => {
      setShowContactModal(false);
      setContactAction(null);
    };

    const openChatbot = () => {
      setShowChatbot(true);
      // Initialize with welcome message
      setChatMessages([
        {
          id: 1,
          type: 'ai',
          message: `Hello ${userData?.name || 'there'}! 👋 I'm your AI interior design assistant. I can help you with:\n\n• Project planning and consultation\n• Design style recommendations\n• Budget estimation\n• Material and furniture suggestions\n• Timeline planning\n\nWhat would you like to discuss about your interior design project?`,
          timestamp: new Date()
        }
      ]);
    };

    const closeChatbot = () => {
      setShowChatbot(false);
      setChatMessages([]);
      setCurrentMessage('');
    };

    const sendMessage = () => {
      if (!currentMessage.trim()) return;
      if (isSending) return; // Prevent duplicate messages

      setIsSending(true);

      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: currentMessage,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      setCurrentMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(currentMessage);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: aiResponse,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiMessage]);
        setIsSending(false);
      }, 1000);
    };

    const generateAIResponse = (userMessage) => {
      const message = userMessage.toLowerCase();
      
      if (message.includes('budget') || message.includes('cost') || message.includes('price')) {
        return `Great question about budget! 💰 Our projects typically range from:\n\n• Basic renovation: ₹50,000 - ₹2,00,000\n• Complete makeover: ₹2,00,000 - ₹8,00,000\n• Luxury projects: ₹8,00,000+\n\nI'd recommend scheduling a consultation to get a precise quote for your specific requirements. Would you like me to help you book a consultation?`;
      }
      
      if (message.includes('style') || message.includes('design') || message.includes('theme')) {
        return `Excellent! Let's find your perfect style! 🎨 Here are some popular options:\n\n• Modern Minimalist - Clean lines, neutral colors\n• Scandinavian - Light woods, cozy textures\n• Industrial - Exposed elements, raw materials\n• Traditional - Classic elegance, rich details\n• Contemporary - Current trends, mixed styles\n\nWhich style appeals to you most? I can provide specific recommendations!`;
      }
      
      if (message.includes('timeline') || message.includes('duration') || message.includes('time')) {
        return `Timeline planning is crucial! ⏰ Here's what to expect:\n\n• Consultation & Planning: 1-2 weeks\n• Design Development: 2-4 weeks\n• Material Selection: 1-2 weeks\n• Execution: 4-12 weeks (depending on scope)\n\nTotal project time: 8-20 weeks\n\nWould you like to discuss your specific timeline requirements?`;
      }
      
      if (message.includes('material') || message.includes('furniture') || message.includes('furnishing')) {
        return `Materials and furniture are key! 🛋️ We offer:\n\n• Premium materials (Italian marble, hardwood)\n• Budget-friendly alternatives\n• Smart home integration\n• Custom furniture design\n• Sustainable eco-friendly options\n\nWhat's your priority - luxury, budget, or sustainability?`;
      }
      
      if (message.includes('consultation') || message.includes('meet') || message.includes('book')) {
        return `Perfect! Let's get you scheduled! 📅 We offer:\n\n• Free initial consultation\n• Video calls or in-person meetings\n• Showroom visits\n• Site assessments\n\nI can connect you with our team right now. Would you like to book a consultation?`;
      }
      
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return `Hello again! 👋 How can I assist you with your interior design project today? Feel free to ask about design styles, budgets, timelines, or anything else!`;
      }
      
      return `Thank you for your question! 🤔 I understand you're interested in interior design. To better assist you, could you tell me more about:\n\n• Your project type (residential/commercial)\n• Your preferred style\n• Your budget range\n• Your timeline\n\nThis will help me provide more specific recommendations!`;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    const openPortfolio = () => {
      setShowPortfolio(true);
    };

    const closePortfolio = () => {
      setShowPortfolio(false);
    };

    const handleStartProject = () => {
      // Navigate to order page using the proper navigation method
      if (typeof onPageChange === 'function') {
        onPageChange('order');
      }
    };

    // Portfolio data
    const portfolioProjects = [
      {
        id: 1,
        title: "Modern Living Room",
        category: "Living Room",
        image: "🏠",
        description: "Contemporary living room with minimalist design, featuring clean lines, neutral colors, and smart home integration.",
        features: ["Smart lighting system", "Custom furniture", "Acoustic panels", "Hidden storage"],
        budget: "₹3,50,000",
        duration: "6 weeks",
        rating: 4.8,
        reviews: 24
      },
      {
        id: 2,
        title: "Luxury Kitchen Renovation",
        category: "Kitchen",
        image: "🍳",
        description: "High-end kitchen renovation with premium materials, including Italian marble countertops and custom cabinetry.",
        features: ["Italian marble countertops", "Custom cabinetry", "Premium appliances", "Island design"],
        budget: "₹8,50,000",
        duration: "8 weeks",
        rating: 4.9,
        reviews: 31
      },
      {
        id: 3,
        title: "Scandinavian Bedroom",
        category: "Bedroom",
        image: "🛏️",
        description: "Cozy bedroom with Scandinavian design principles, featuring light woods, soft textures, and natural elements.",
        features: ["Light wood furniture", "Soft textiles", "Natural lighting", "Storage solutions"],
        budget: "₹2,20,000",
        duration: "4 weeks",
        rating: 4.7,
        reviews: 18
      },
      {
        id: 4,
        title: "Industrial Office Space",
        category: "Commercial",
        image: "🏢",
        description: "Modern office space with industrial aesthetics, exposed elements, and collaborative work areas.",
        features: ["Exposed brick walls", "Collaborative spaces", "Modern lighting", "Flexible seating"],
        budget: "₹12,00,000",
        duration: "10 weeks",
        rating: 4.6,
        reviews: 15
      },
      {
        id: 5,
        title: "Traditional Dining Room",
        category: "Dining Room",
        image: "🍽️",
        description: "Elegant dining room with traditional design elements, featuring rich colors and classic furniture pieces.",
        features: ["Classic furniture", "Rich color palette", "Chandelier lighting", "Formal seating"],
        budget: "₹4,80,000",
        duration: "5 weeks",
        rating: 4.8,
        reviews: 22
      },
      {
        id: 6,
        title: "Contemporary Bathroom",
        category: "Bathroom",
        image: "🚿",
        description: "Modern bathroom with contemporary fixtures, featuring walk-in shower and premium finishes.",
        features: ["Walk-in shower", "Premium fixtures", "Heated floors", "Smart mirrors"],
        budget: "₹3,20,000",
        duration: "4 weeks",
        rating: 4.9,
        reviews: 28
      }
    ];

    const getContactInfo = (action) => {
      if (!selectedProject) return null;

      switch (action) {
        case 'contact-designer':
          return {
            title: '📞 Contact Designer',
            subtitle: `Get in touch with ${selectedProject.designer}`,
            contact: {
              name: selectedProject.designer,
              role: 'Senior Interior Designer',
              email: selectedProject.designerEmail,
              phone: selectedProject.designerPhone,
              availability: 'Mon-Fri: 9 AM - 6 PM',
              responseTime: 'Within 2 hours during business hours'
            },
            actions: [
              { icon: '📧', label: 'Send Email', action: `mailto:${selectedProject.designerEmail}?subject=Project: ${selectedProject.title}` },
              { icon: '📞', label: 'Call Now', action: `tel:${selectedProject.designerPhone}` },
              { icon: '💬', label: 'WhatsApp', action: `https://wa.me/${selectedProject.designerPhone.replace(/\D/g, '')}?text=Hi ${selectedProject.designer}, I have a question about my project: ${selectedProject.title}` }
            ]
          };
        case 'schedule-meeting':
          return {
            title: '📅 Schedule Meeting',
            subtitle: 'Book a consultation or project review meeting',
            contact: {
              name: selectedProject.projectManager,
              role: 'Project Manager',
              email: `${selectedProject.projectManager.toLowerCase().replace(' ', '.')}@salesflow.com`,
              phone: selectedProject.projectManagerPhone,
              availability: 'Mon-Sat: 10 AM - 7 PM',
              responseTime: 'Within 1 hour during business hours'
            },
            actions: [
              { icon: '📅', label: 'Video Consultation', action: 'https://calendly.com/salesflow/video-consultation', type: 'external' },
              { icon: '🏢', label: 'Showroom Visit', action: 'https://calendly.com/salesflow/showroom-visit', type: 'external' },
              { icon: '📋', label: 'Project Review', action: 'https://calendly.com/salesflow/project-review', type: 'external' },
              { icon: '🎨', label: 'Design Discussion', action: 'https://calendly.com/salesflow/design-discussion', type: 'external' },
              { icon: '📞', label: 'Phone Consultation', action: 'https://calendly.com/salesflow/phone-consultation', type: 'external' },
              { icon: '🏠', label: 'Site Visit', action: 'https://calendly.com/salesflow/site-visit', type: 'external' }
            ]
          };
        case 'download-report':
          return {
            title: '📊 Download Report',
            subtitle: 'Access project reports and documents',
            contact: {
              name: 'Support Team',
              role: 'Document Management',
              email: 'support@salesflow.com',
              phone: '+91 1800 123 4567',
              availability: '24/7 Support',
              responseTime: 'Within 30 minutes'
            },
            actions: [
              { icon: '📊', label: 'Project Progress Report', action: `#download-progress-${selectedProject.id}`, type: 'pdf' },
              { icon: '💰', label: 'Payment Summary', action: `#download-payment-${selectedProject.id}`, type: 'excel' },
              { icon: '📋', label: 'Project Timeline', action: `#download-timeline-${selectedProject.id}`, type: 'pdf' },
              { icon: '📄', label: 'Contract Details', action: `#download-contract-${selectedProject.id}`, type: 'pdf' },
              { icon: '🔨', label: 'Material List', action: `#download-materials-${selectedProject.id}`, type: 'excel' },
              { icon: '📈', label: 'Project Analytics', action: `#download-analytics-${selectedProject.id}`, type: 'json' }
            ]
          };
        default:
          return null;
      }
    };

    const getUpdateStatusColor = (status) => {
      switch (status) {
        case 'completed': return '#22c55e';
        case 'in-progress': return '#f59e0b';
        case 'pending': return '#646cff';
        case 'upcoming': return '#6b7280';
        default: return '#6b7280';
      }
    };

    const getDocumentIcon = (type) => {
      switch (type) {
        case 'contract': return '📋';
        case 'design': return '🎨';
        case 'specification': return '📝';
        case 'financial': return '💰';
        case 'timeline': return '📅';
        case 'completion': return '✅';
        case 'warranty': return '🛡️';
        default: return '📄';
      }
    };

    console.log('UserDashboard about to render JSX...');
    
    return (
      <div className="user-dashboard">
        <div className="user-dashboard-container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-content">
              <h1>Welcome back, {userData?.name || 'Valued Customer'}! 🏠</h1>
              <p>Transform your space with India's leading interior design experts</p>
            </div>
            <div className="quick-action">
              <button className="cta-button" onClick={handleStartProject}>
                <span className="cta-icon">🛋️</span>
                Start Your Project
              </button>
            </div>
          </div>

          {/* User-Specific Projects */}
          <div className="user-projects-section">
            <h2>🏠 My Projects</h2>
            <div className="user-projects-grid">
              {userProjects.map((project, index) => (
                <div key={project.id} className="user-project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span 
                      className="project-status" 
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="project-progress-container">
                    <div className="project-progress-label">
                      <span>Progress: {project.progress}%</span>
                    </div>
                    <div className="project-progress-bar">
                      <div 
                        className="project-progress-fill" 
                        style={{ 
                          width: `${project.progress}%`, 
                          backgroundColor: getProgressColor(project.progress) 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="project-details">
                    <div className="premium-info-grid">
                      <div className="premium-info-item">
                        <span className="premium-label">Type</span>
                        <span className="premium-value">{project.type}</span>
                      </div>
                      <div className="premium-info-item">
                        <span className="premium-label">Budget</span>
                        <span className="premium-value">{project.budget}</span>
                      </div>
                      <div className="premium-info-item">
                        <span className="premium-label">Phase</span>
                        <span className="premium-value">{project.currentPhase}</span>
                      </div>
                      <div className="premium-info-item">
                        <span className="premium-label">Next</span>
                        <span className="premium-value">{project.nextMilestone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-actions">
                    <button className="view-details-btn" onClick={() => handleViewDetails(project)}>
                      View Details
                    </button>
                    {project.status !== 'Completed' && (
                      <button className="contact-designer-btn" onClick={() => handleContactDesigner(project)}>
                        Contact Designer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Values */}
          <div className="values-section">
            <h2>🌟 Why Choose SalesFlow Premium?</h2>
            <div className="values-grid">
              {companyValues.map((value, index) => (
                <div key={index} className="value-card" style={{'--accent-color': value.color}}>
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Statistics */}
          <div className="stats-section">
            <div className="stats-header">
              <h2>📊 Our Track Record</h2>
              <div className="year-selector">
                <label>Year:</label>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {Object.keys(projectStats).reverse().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏗️</div>
                <div className="stat-number">{currentStats.completed}</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">😊</div>
                <div className="stat-number">{currentStats.satisfaction}</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-number">{currentStats.cities}</div>
                <div className="stat-label">Cities Served</div>
              </div>
            </div>
          </div>

          {/* Project Categories */}
          <div className="categories-section">
            <h2>🎨 Our Expertise</h2>
            <div className="categories-grid">
              {projectCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="category-card clickable" 
                  style={{'--category-color': category.color}}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <div className="category-count">{category.count}</div>
                    <p>{category.description}</p>
                    <div className="click-hint">📸 Click to view gallery</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Roadmap */}
          <div className="achievements-section roadmap-section">
            <h2>🚀 Our Journey - From Vision to Leadership</h2>
            <div className="achievements-grid roadmap-grid">
              {roadmapMilestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`achievement-card roadmap-${milestone.phase}`}
                  data-letter={String.fromCharCode(65 + index)}
                >
                  <div className="achievement-content">
                    <div className="achievement-year">{milestone.year}</div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="testimonials-section">
            <h2>💬 What Our Customers Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "SalesFlow transformed our 2BHK into a stunning modern home. The attention to detail and quality of work exceeded our expectations!"
                </div>
                <div className="testimonial-author">
                  <strong>Priya & Raj Sharma</strong>
                  <span>Gurgaon • Residential Project</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "Professional team, timely delivery, and budget-friendly solutions. Highly recommend for anyone looking for quality interior design."
                </div>
                <div className="testimonial-author">
                  <strong>Amit Patel</strong>
                  <span>Mumbai • Commercial Office</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "From consultation to completion, the entire process was smooth. Our new office space has boosted team productivity significantly!"
                </div>
                <div className="testimonial-author">
                  <strong>TechStart Solutions</strong>
                  <span>Bangalore • Corporate Client</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h2>Ready to Transform Your Space?</h2>
            <p>Join thousands of satisfied customers who trusted us with their dream spaces</p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={openChatbot}>
                <span className="cta-icon">📞</span>
                Get Free Consultation
              </button>
              <button className="cta-btn secondary" onClick={openPortfolio}>
                <span className="cta-icon">📋</span>
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        {showProjectDetails && selectedProject && (
          <div className="project-details-modal-overlay" onClick={closeProjectDetails}>
            <div className="project-details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>📋 {selectedProject.title}</h2>
                <button className="close-modal" onClick={closeProjectDetails}>✕</button>
              </div>
              
              <div className="modal-content">
                <div className="project-overview">
                  <div className="overview-grid">
                    <div className="overview-item">
                      <strong>Project ID:</strong> {selectedProject.id}
                    </div>
                    <div className="overview-item">
                      <strong>Status:</strong> 
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(selectedProject.status) }}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="overview-item">
                      <strong>Progress:</strong> {selectedProject.progress}%
                    </div>
                    <div className="overview-item">
                      <strong>Budget:</strong> {selectedProject.budget}
                    </div>
                    <div className="overview-item">
                      <strong>Timeline:</strong> {selectedProject.timeline}
                    </div>
                    <div className="overview-item">
                      <strong>Property Size:</strong> {selectedProject.propertySize}
                    </div>
                  </div>
                </div>

                <div className="project-sections">
                  <div className="section">
                    <h3>📍 Project Location</h3>
                    <p>{selectedProject.address}</p>
                  </div>

                  <div className="section">
                    <h3>👥 Team</h3>
                    <div className="team-info">
                      <div className="team-member">
                        <strong>Designer:</strong> {selectedProject.designer}
                        <br />
                        <small>📧 {selectedProject.designerEmail}</small>
                        <br />
                        <small>📞 {selectedProject.designerPhone}</small>
                      </div>
                      <div className="team-member">
                        <strong>Project Manager:</strong> {selectedProject.projectManager}
                        <br />
                        <small>📞 {selectedProject.projectManagerPhone}</small>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <h3>🏠 Rooms & Areas</h3>
                    <div className="rooms-list">
                      {selectedProject.rooms.map((room, index) => (
                        <span key={index} className="room-tag">{room}</span>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h3>🔨 Materials & Features</h3>
                    <div className="materials-list">
                      {selectedProject.materials.map((material, index) => (
                        <span key={index} className="material-tag">{material}</span>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h3>💰 Payment Status</h3>
                    <div className="payment-info">
                      <p><strong>Status:</strong> {selectedProject.paymentStatus}</p>
                      <p><strong>Next Payment:</strong> {selectedProject.nextPayment}</p>
                    </div>
                  </div>

                  <div className="section">
                    <h3>📅 Project Updates</h3>
                    <div className="updates-timeline">
                      {selectedProject.updates.map((update, index) => (
                        <div key={index} className="update-item">
                          <div className="update-date">{update.date}</div>
                          <div className="update-content">
                            <div className="update-message">{update.message}</div>
                            <span 
                              className="update-status" 
                              style={{ backgroundColor: getUpdateStatusColor(update.status) }}
                            >
                              {update.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h3>📄 Documents</h3>
                    <div className="documents-list">
                      {selectedProject.documents.map((doc, index) => (
                        <div key={index} className="document-item">
                          <span className="document-icon">{getDocumentIcon(doc.type)}</span>
                          <span className="document-name">{doc.name}</span>
                          <button className="download-btn">📥</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="contact-designer-btn" onClick={() => handleContactAction('contact-designer')}>
                    📞 Contact Designer
                  </button>
                  <button className="schedule-meeting-btn" onClick={() => handleContactAction('schedule-meeting')}>
                    📅 Schedule Meeting
                  </button>
                  <button className="download-report-btn" onClick={() => handleContactAction('download-report')}>
                    📊 Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Actions Modal */}
        {showContactModal && contactAction && selectedProject && (
          <div className="contact-modal-overlay" onClick={closeContactModal}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
              {(() => {
                const contactInfo = getContactInfo(contactAction);
                if (!contactInfo) return null;
                
                return (
                  <>
                    <div className="contact-modal-header">
                      <h2>{contactInfo.title}</h2>
                      <button className="close-modal" onClick={closeContactModal}>✕</button>
                    </div>
                    
                    <div className="contact-modal-content">
                      <div className="contact-info-section">
                        <h3>{contactInfo.subtitle}</h3>
                        
                        <div className="contact-person">
                          <div className="contact-avatar">
                            {contactInfo.contact.name.charAt(0)}
                          </div>
                          <div className="contact-details">
                            <h4>{contactInfo.contact.name}</h4>
                            <p className="contact-role">{contactInfo.contact.role}</p>
                            <div className="contact-methods">
                              <div className="contact-method">
                                <span className="method-icon">📧</span>
                                <a href={`mailto:${contactInfo.contact.email}`} className="contact-link">
                                  {contactInfo.contact.email}
                                </a>
                              </div>
                              <div className="contact-method">
                                <span className="method-icon">📞</span>
                                <a href={`tel:${contactInfo.contact.phone}`} className="contact-link">
                                  {contactInfo.contact.phone}
                                </a>
                              </div>
                            </div>
                            <div className="contact-availability">
                              <p><strong>Availability:</strong> {contactInfo.contact.availability}</p>
                              <p><strong>Response Time:</strong> {contactInfo.contact.responseTime}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="action-buttons-section">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons-grid">
                          {contactInfo.actions.map((action, index) => (
                            <a 
                              key={index}
                              href={action.action}
                              className={`action-button ${action.type ? `action-${action.type}` : ''}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="action-icon">{action.icon}</span>
                              <span className="action-label">{action.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {contactAction === 'schedule-meeting' && (
                        <div className="meeting-info">
                          <h3>📅 Meeting Options</h3>
                          <div className="meeting-options">
                            <div className="meeting-option">
                              <h4>🎥 Video Consultation</h4>
                              <p>30-60 minute video call to discuss your project requirements and design preferences.</p>
                              <ul>
                                <li>Screen sharing for design presentations</li>
                                <li>Real-time collaboration</li>
                                <li>Recorded session available</li>
                              </ul>
                            </div>
                            <div className="meeting-option">
                              <h4>🏢 Showroom Visit</h4>
                              <p>Visit our showroom to see materials, furniture, and design samples in person.</p>
                              <ul>
                                <li>Physical material samples</li>
                                <li>Furniture and fixture displays</li>
                                <li>Expert consultation</li>
                              </ul>
                            </div>
                            <div className="meeting-option">
                              <h4>📋 Project Review</h4>
                              <p>Detailed review of your project progress, timeline, and next steps.</p>
                              <ul>
                                <li>Progress assessment</li>
                                <li>Timeline updates</li>
                                <li>Issue resolution</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {contactAction === 'download-report' && (
                        <div className="download-info">
                          <h3>📊 Available Reports</h3>
                          <div className="report-types">
                            <div className="report-type">
                              <h4>📊 Project Progress Report</h4>
                              <p>Comprehensive PDF report with current progress, milestones, and next steps.</p>
                              <span className="file-format">PDF Format</span>
                            </div>
                            <div className="report-type">
                              <h4>💰 Payment Summary</h4>
                              <p>Excel spreadsheet with detailed payment breakdown, due dates, and receipts.</p>
                              <span className="file-format">Excel Format</span>
                            </div>
                            <div className="report-type">
                              <h4>📈 Project Analytics</h4>
                              <p>JSON data file with project metrics, timelines, and performance indicators.</p>
                              <span className="file-format">JSON Format</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="additional-info">
                        <h3>💡 Additional Information</h3>
                        <div className="info-cards">
                          <div className="info-card">
                            <h4>📋 Project Details</h4>
                            <p><strong>Project:</strong> {selectedProject.title}</p>
                            <p><strong>Status:</strong> {selectedProject.status}</p>
                            <p><strong>Progress:</strong> {selectedProject.progress}%</p>
                          </div>
                          <div className="info-card">
                            <h4>⏰ Best Times to Contact</h4>
                            <p>• Weekdays: 9 AM - 6 PM</p>
                            <p>• Weekends: 10 AM - 4 PM</p>
                            <p>• Emergency: 24/7 Support</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* AI Chatbot Modal */}
        {showChatbot && (
          <div className="chatbot-modal-overlay" onClick={closeChatbot}>
            <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
              <div className="chatbot-header">
                <div className="chatbot-title">
                  <span className="ai-avatar">🤖</span>
                  <div>
                    <h3>AI Design Assistant</h3>
                    <p>Your personal interior design consultant</p>
                  </div>
                </div>
                <button className="close-chatbot" onClick={closeChatbot}>✕</button>
              </div>
              
              <div className="chatbot-messages">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`chat-message ${message.type}`}>
                    <div className="message-avatar">
                      {message.type === 'ai' ? '🤖' : '👤'}
                    </div>
                    <div className="message-content">
                      <div className="message-text">
                        {message.message.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="chatbot-input">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about interior design, budgets, styles, or anything else..."
                  rows="2"
                />
                <button 
                  className="send-message-btn" 
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isSending}
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Modal */}
        {showPortfolio && (
          <div className="portfolio-modal-overlay" onClick={closePortfolio}>
            <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
              <div className="portfolio-header">
                <div className="portfolio-title">
                  <span className="portfolio-icon">📋</span>
                  <div>
                    <h2>Our Portfolio</h2>
                    <p>Explore our completed projects and design expertise</p>
                  </div>
                </div>
                <button className="close-portfolio" onClick={closePortfolio}>✕</button>
              </div>
              
              <div className="portfolio-content">
                <div className="portfolio-grid">
                  {portfolioProjects.map((project) => (
                    <div key={project.id} className="portfolio-card">
                      <div className="portfolio-card-header">
                        <div className="project-image">{project.image}</div>
                        <div className="project-info">
                          <h3>{project.title}</h3>
                          <span className="project-category">{project.category}</span>
                        </div>
                        <div className="project-rating">
                          <span className="stars">{"⭐".repeat(Math.floor(project.rating))}</span>
                          <span className="rating-text">{project.rating} ({project.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="project-description">
                        <p>{project.description}</p>
                      </div>
                      
                      <div className="project-features">
                        <h4>Key Features:</h4>
                        <ul>
                          {project.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="project-details">
                        <div className="detail-item">
                          <span className="detail-label">💰 Budget:</span>
                          <span className="detail-value">{project.budget}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">⏰ Duration:</span>
                          <span className="detail-value">{project.duration}</span>
                        </div>
                      </div>
                      
                      <div className="portfolio-actions">
                        <button className="view-details-btn">View Details</button>
                        <button className="get-quote-btn">Get Quote</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
  console.error('Error in UserDashboard:', error);
  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>Error Loading Dashboard</h2>
      <p>There was an error loading your dashboard: {error.message}</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
}
};

export default UserDashboard; 