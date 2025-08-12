import { useState } from 'react';
import './OrderPage.css';

const OrderPage = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Project Details
    projectType: '',
    propertyType: '',
    roomsToDesign: [],
    propertySize: '',
    currentStatus: '',
    timeline: '',
    budget: '',
    
    // Design Preferences
    designStyle: '',
    colorPreferences: [],
    furnitureIncluded: false,
    lightingIncluded: false,
    flooring: '',
    wallTreatment: '',
    
    // Specific Requirements
    familySize: '',
    ageGroups: [],
    pets: false,
    specialNeeds: '',
    mustHaveFeatures: '',
    avoidFeatures: '',
    
    // Additional Services
    consultationNeeded: false,
    projectManagement: false,
    installation: false,
    maintenanceSupport: false,
    
    // Additional Information
    inspirationImages: '',
    additionalNotes: '',
    urgency: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'roomsToDesign' || name === 'colorPreferences' || name === 'ageGroups') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Order submitted:', formData);
      alert('🎉 Your interior design order has been submitted successfully! We will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        fullName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '',
        projectType: '', propertyType: '', roomsToDesign: [], propertySize: '', currentStatus: '',
        timeline: '', budget: '', designStyle: '', colorPreferences: [], furnitureIncluded: false,
        lightingIncluded: false, flooring: '', wallTreatment: '', familySize: '', ageGroups: [],
        pets: false, specialNeeds: '', mustHaveFeatures: '', avoidFeatures: '', consultationNeeded: false,
        projectManagement: false, installation: false, maintenanceSupport: false, inspirationImages: '',
        additionalNotes: '', urgency: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>📋 Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
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
                <label htmlFor="phone">Phone Number *</label>
                                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
              </div>
              <div className="form-group full-width">
                <label htmlFor="address">Property Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address where design work will be done"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
                              <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="DL">Delhi</option>
                    <option value="MH">Maharashtra</option>
                    <option value="KA">Karnataka</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="GJ">Gujarat</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="WB">West Bengal</option>
                    <option value="HR">Haryana</option>
                    <option value="PB">Punjab</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                              <div className="form-group">
                  <label htmlFor="zipCode">PIN Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="110001"
                    required
                  />
                </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>🏠 Project Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Project Type</option>
                  <option value="complete-renovation">Complete Home Renovation</option>
                  <option value="room-design">Individual Room Design</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="staging">Home Staging</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="propertyType">Property Type *</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condominium</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="loft">Loft</option>
                  <option value="office">Office Space</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Rooms to Design *</label>
                <div className="checkbox-grid">
                  {['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Dining Room', 'Home Office', 'Basement', 'Outdoor Space'].map(room => (
                    <label key={room} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="roomsToDesign"
                        value={room}
                        checked={formData.roomsToDesign.includes(room)}
                        onChange={handleInputChange}
                      />
                      {room}
                    </label>
                  ))}
                </div>
              </div>
                              <div className="form-group">
                  <label htmlFor="propertySize">Property Size *</label>
                  <select
                    id="propertySize"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="under-46">Under 500 sq ft (46 sq m)</option>
                    <option value="46-93">500 - 1,000 sq ft (46 - 93 sq m)</option>
                    <option value="93-139">1,000 - 1,500 sq ft (93 - 139 sq m)</option>
                    <option value="139-232">1,500 - 2,500 sq ft (139 - 232 sq m)</option>
                    <option value="232-372">2,500 - 4,000 sq ft (232 - 372 sq m)</option>
                    <option value="over-372">Over 4,000 sq ft (372+ sq m)</option>
                  </select>
                </div>
              <div className="form-group">
                <label htmlFor="currentStatus">Current Status *</label>
                <select
                  id="currentStatus"
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="empty">Empty/Unfurnished</option>
                  <option value="partially-furnished">Partially Furnished</option>
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="construction">Under Construction</option>
                  <option value="renovation">Under Renovation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timeline">Desired Timeline *</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Timeline</option>
                  <option value="asap">ASAP (Rush Order)</option>
                  <option value="1-month">Within 1 Month</option>
                  <option value="2-3-months">2-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="6-12-months">6-12 Months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
                              <div className="form-group">
                  <label htmlFor="budget">Budget Range *</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Budget</option>
                    <option value="under-5l">Under ₹5,00,000</option>
                    <option value="5l-15l">₹5,00,000 - ₹15,00,000</option>
                    <option value="15l-30l">₹15,00,000 - ₹30,00,000</option>
                    <option value="30l-50l">₹30,00,000 - ₹50,00,000</option>
                    <option value="50l-1cr">₹50,00,000 - ₹1,00,00,000</option>
                    <option value="over-1cr">Over ₹1,00,00,000</option>
                  </select>
                </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>🎨 Design Preferences</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="designStyle">Preferred Design Style *</label>
                <select
                  id="designStyle"
                  name="designStyle"
                  value={formData.designStyle}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Style</option>
                  <option value="modern">Modern</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="traditional">Traditional</option>
                  <option value="transitional">Transitional</option>
                  <option value="scandinavian">Scandinavian</option>
                  <option value="industrial">Industrial</option>
                  <option value="bohemian">Bohemian</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="eclectic">Eclectic</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Color Preferences</label>
                <div className="checkbox-grid">
                  {['Neutral Tones', 'Bold & Bright', 'Earth Tones', 'Pastels', 'Monochrome', 'Jewel Tones'].map(color => (
                    <label key={color} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="colorPreferences"
                        value={color}
                        checked={formData.colorPreferences.includes(color)}
                        onChange={handleInputChange}
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="flooring">Flooring Preference</label>
                <select
                  id="flooring"
                  name="flooring"
                  value={formData.flooring}
                  onChange={handleInputChange}
                >
                  <option value="">Select Flooring</option>
                  <option value="hardwood">Hardwood</option>
                  <option value="laminate">Laminate</option>
                  <option value="vinyl">Vinyl/LVP</option>
                  <option value="tile">Tile</option>
                  <option value="carpet">Carpet</option>
                  <option value="concrete">Polished Concrete</option>
                  <option value="existing">Keep Existing</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="wallTreatment">Wall Treatment</label>
                <select
                  id="wallTreatment"
                  name="wallTreatment"
                  value={formData.wallTreatment}
                  onChange={handleInputChange}
                >
                  <option value="">Select Treatment</option>
                  <option value="paint">Paint Only</option>
                  <option value="wallpaper">Wallpaper</option>
                  <option value="accent-wall">Accent Wall</option>
                  <option value="wainscoting">Wainscoting</option>
                  <option value="textured">Textured Walls</option>
                  <option value="existing">Keep Existing</option>
                </select>
              </div>
              <div className="form-group full-width">
                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="furnitureIncluded"
                      checked={formData.furnitureIncluded}
                      onChange={handleInputChange}
                    />
                    Include Furniture Selection & Purchase
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="lightingIncluded"
                      checked={formData.lightingIncluded}
                      onChange={handleInputChange}
                    />
                    Include Lighting Design & Installation
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3>👨‍👩‍👧‍👦 Lifestyle & Requirements</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="familySize">Family Size</label>
                <select
                  id="familySize"
                  name="familySize"
                  value={formData.familySize}
                  onChange={handleInputChange}
                >
                  <option value="">Select Size</option>
                  <option value="single">Single Person</option>
                  <option value="couple">Couple</option>
                  <option value="small-family">Small Family (3-4)</option>
                  <option value="large-family">Large Family (5+)</option>
                  <option value="roommates">Roommates</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Age Groups in Household</label>
                <div className="checkbox-grid">
                  {['Infants (0-2)', 'Children (3-12)', 'Teenagers (13-18)', 'Adults (19-64)', 'Seniors (65+)'].map(age => (
                    <label key={age} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="ageGroups"
                        value={age}
                        checked={formData.ageGroups.includes(age)}
                        onChange={handleInputChange}
                      />
                      {age}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group full-width">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="pets"
                    checked={formData.pets}
                    onChange={handleInputChange}
                  />
                  🐕 We have pets (design will consider pet-friendly materials)
                </label>
              </div>
              <div className="form-group full-width">
                <label htmlFor="specialNeeds">Special Needs or Accessibility Requirements</label>
                <textarea
                  id="specialNeeds"
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleInputChange}
                  placeholder="Please describe any accessibility needs, mobility considerations, or special requirements..."
                  rows="3"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="mustHaveFeatures">Must-Have Features</label>
                <textarea
                  id="mustHaveFeatures"
                  name="mustHaveFeatures"
                  value={formData.mustHaveFeatures}
                  onChange={handleInputChange}
                  placeholder="List specific features that are essential for your space (e.g., home office area, reading nook, entertainment center, etc.)"
                  rows="3"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="avoidFeatures">Features to Avoid</label>
                <textarea
                  id="avoidFeatures"
                  name="avoidFeatures"
                  value={formData.avoidFeatures}
                  onChange={handleInputChange}
                  placeholder="Anything you definitely don't want in your space (e.g., no bright colors, no fragile items, no heavy furniture, etc.)"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h3>🛠️ Additional Services & Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Additional Services Needed</label>
                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consultationNeeded"
                      checked={formData.consultationNeeded}
                      onChange={handleInputChange}
                    />
                    🏠 In-Home Consultation
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="projectManagement"
                      checked={formData.projectManagement}
                      onChange={handleInputChange}
                    />
                    📋 Full Project Management
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="installation"
                      checked={formData.installation}
                      onChange={handleInputChange}
                    />
                    🔧 Installation Services
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="maintenanceSupport"
                      checked={formData.maintenanceSupport}
                      onChange={handleInputChange}
                    />
                    🛡️ Ongoing Maintenance Support
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="urgency">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                >
                  <option value="">Select Urgency</option>
                  <option value="low">Low - Just exploring options</option>
                  <option value="medium">Medium - Planning for near future</option>
                  <option value="high">High - Need to start soon</option>
                  <option value="urgent">Urgent - Need immediate attention</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="inspirationImages">Inspiration Images/Links</label>
                <textarea
                  id="inspirationImages"
                  name="inspirationImages"
                  value={formData.inspirationImages}
                  onChange={handleInputChange}
                  placeholder="Share any Pinterest boards, Instagram accounts, website links, or describe images that inspire your vision..."
                  rows="3"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any other information you'd like us to know about your project, preferences, or requirements..."
                  rows="4"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-header">
          <h1>🏠 Home Interior Design Order</h1>
          <p>Transform your space with our premium interior design services</p>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-steps">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i + 1} className={`progress-step ${i + 1 <= currentStep ? 'active' : ''}`}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-title">
                    {i === 0 && 'Personal Info'}
                    {i === 1 && 'Project Details'}
                    {i === 2 && 'Design Style'}
                    {i === 3 && 'Lifestyle'}
                    {i === 4 && 'Services'}
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-line">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          {renderStepContent()}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-btn prev-btn">
                ← Previous
              </button>
            )}
            
            <div className="step-info">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="nav-btn next-btn">
                Next →
              </button>
            ) : (
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Order 🚀'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage; 