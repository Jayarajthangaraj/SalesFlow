import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Lead Designer',
      image: '👩‍💼',
      description: '15+ years in interior design with expertise in luxury residential and commercial spaces.'
    },
    {
      name: 'Michael Chen',
      role: 'Senior Designer',
      image: '👨‍💻',
      description: 'Specializes in modern and minimalist designs with a focus on sustainable materials.'
    },
    {
      name: 'Emily Davis',
      role: 'Project Manager',
      image: '👩‍🔧',
      description: 'Ensures seamless project execution from concept to completion with meticulous attention to detail.'
    },
    {
      name: 'David Rodriguez',
      role: '3D Visualization Expert',
      image: '👨‍🎨',
      description: 'Creates stunning 3D renders and virtual walkthroughs to bring designs to life.'
    }
  ];

  const values = [
    {
      icon: '✨',
      title: 'Innovation',
      description: 'We stay ahead of design trends and incorporate cutting-edge technology in our projects.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We work closely with clients to understand their vision and bring it to reality.'
    },
    {
      icon: '🏆',
      title: 'Quality',
      description: 'We never compromise on quality and deliver exceptional results every time.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We prioritize eco-friendly materials and sustainable design practices.'
    }
  ];

  const milestones = [
    { year: '2015', event: 'SalesFlow Founded', description: 'Started with a vision to revolutionize interior design' },
    { year: '2017', event: '100+ Projects', description: 'Completed our first 100 residential projects' },
    { year: '2019', event: 'Premium Launch', description: 'Launched SalesFlow Premium with advanced features' },
    { year: '2021', event: 'Industry Recognition', description: 'Won "Best Interior Design Firm" award' },
    { year: '2023', event: '1000+ Happy Clients', description: 'Reached milestone of 1000 satisfied customers' }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>ℹ️ About SalesFlow Premium</h1>
          <p className="hero-description">
            Transforming spaces, enhancing lives. We are passionate interior design experts 
            dedicated to creating beautiful, functional spaces that reflect your unique style and needs.
          </p>
        </div>

        {/* Company Story */}
        <div className="story-section">
          <div className="story-content">
                    <div className="story-text">
          <h2>🏠 Our Story</h2>
          <p>
            Founded in 2015, SalesFlow began with a simple mission: to make professional 
            interior design accessible to every Indian home. What started as a small team of passionate 
            designers has grown into a premium design firm serving clients across India.
          </p>
          <p>
            We believe that great design isn't just about aesthetics—it's about creating 
            spaces that enhance the way you live and work while respecting Indian culture and lifestyle. 
            Our approach combines creativity with functionality, ensuring every project is both beautiful and practical.
          </p>
          <p>
            Today, we're proud to be at the forefront of interior design innovation in India, 
            using cutting-edge technology and sustainable practices to create spaces 
            that are not just stunning, but also environmentally responsible.
          </p>
        </div>
            <div className="story-stats">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>👥 Meet Our Team</h2>
          <p className="team-intro">
            Our talented team of designers, project managers, and specialists work together 
            to bring your vision to life.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.image}</div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>💎 Our Values</h2>
          <p className="values-intro">
            These core values guide everything we do and shape the way we work with our clients.
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h2>📅 Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.event}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-grid">
            <div className="mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To create exceptional interior spaces that enhance the way people live and work, 
                while maintaining the highest standards of quality, sustainability, and customer service.
              </p>
            </div>
            <div className="mission-card">
              <h3>🔮 Our Vision</h3>
              <p>
                To be the leading interior design firm that sets industry standards for innovation, 
                quality, and client satisfaction in the digital age.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Transform Your Space?</h2>
          <p>Let's work together to create the interior of your dreams.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Start Your Project</button>
            <button className="cta-btn secondary">Schedule Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 