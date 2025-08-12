import { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form submitted:', formData);
      alert('✅ Thank you for contacting us! We will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '', email: '', phone: '', subject: '', message: '', urgency: 'medium'
      });
    } catch (error) {
      console.error('Contact form error:', error);
      alert('❌ Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Call us during business hours for immediate assistance'
    },
    {
      icon: '📧',
      title: 'Email',
      details: ['hello@salesflow.com', 'support@salesflow.com'],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: '🏢',
      title: 'Office',
      details: ['123 Design Hub, Cyber City', 'Gurgaon, Haryana 122002'],
      description: 'Visit our showroom to see our work in person'
    },
    {
      icon: '🕐',
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      description: 'We\'re closed on Sundays and national holidays'
    }
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & New Projects' },
    { value: 'support', label: 'Customer Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'partnership', label: 'Partnership Opportunities' }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>📞 Contact Us</h1>
          <p>Get in touch with our interior design experts. We're here to help bring your vision to life!</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>💬 Get In Touch</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="contact-detail">{detail}</p>
                    ))}
                    <p className="contact-description">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>📝 Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Department</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="urgency">Urgency Level</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Standard request</option>
                    <option value="high">High - Urgent matter</option>
                    <option value="urgent">Urgent - Immediate attention needed</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your inquiry, project details, or how we can help you..."
                    rows="6"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  'Send Message 📤'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h3>How quickly do you respond?</h3>
              <p>We respond to all inquiries within 24 hours during business days. Urgent matters are addressed within 2-4 hours.</p>
            </div>
            <div className="faq-card">
              <h3>Do you offer free consultations?</h3>
              <p>Yes! We provide free initial consultations to discuss your project and provide preliminary recommendations.</p>
            </div>
            <div className="faq-card">
              <h3>What areas do you serve?</h3>
              <p>We primarily serve Delhi NCR, Mumbai, Bangalore, and Pune, but we also take on select projects pan-India for larger commercial spaces.</p>
            </div>
            <div className="faq-card">
              <h3>How do you handle project timelines?</h3>
              <p>Project timelines vary based on scope and complexity. We provide detailed timelines during the planning phase and keep you updated throughout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 