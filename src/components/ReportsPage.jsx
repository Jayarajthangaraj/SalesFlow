import './ReportsPage.css';

const ReportsPage = () => {
  const reportTypes = [
    {
      id: 'sales',
      title: 'Sales Reports',
      icon: '📊',
      description: 'Comprehensive sales analytics and performance metrics',
      features: ['Monthly Sales Summary', 'Revenue Breakdown', 'Customer Analytics', 'Conversion Rates']
    },
    {
      id: 'projects',
      title: 'Project Reports',
      icon: '🏠',
      description: 'Track interior design project progress and completion',
      features: ['Project Timeline', 'Budget Analysis', 'Resource Utilization', 'Client Satisfaction']
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      icon: '💰',
      description: 'Financial performance and profitability analysis',
      features: ['Profit & Loss', 'Cash Flow', 'Expense Tracking', 'ROI Analysis']
    },
    {
      id: 'custom',
      title: 'Custom Reports',
      icon: '⚙️',
      description: 'Create personalized reports based on your specific needs',
      features: ['Custom Metrics', 'Date Range Selection', 'Export Options', 'Automated Scheduling']
    }
  ];

  const quickStats = [
    { label: 'Total Projects', value: '148', change: '+12%', icon: '🏗️' },
    { label: 'Revenue This Month', value: '₹87,45,000', change: '+8.5%', icon: '💵' },
    { label: 'Active Clients', value: '34', change: '+5%', icon: '👥' },
    { label: 'Completion Rate', value: '94%', change: '+2%', icon: '✅' }
  ];

  return (
    <div className="reports-page">
      <div className="reports-container">
        <div className="reports-header">
          <h1>📈 Analytics & Reports</h1>
          <p>Comprehensive insights into your interior design business performance</p>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h2>📊 Quick Overview</h2>
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.label}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change positive">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Types */}
        <div className="report-types">
          <h2>📋 Available Reports</h2>
          <div className="reports-grid">
            {reportTypes.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-icon">{report.icon}</div>
                  <div className="report-info">
                    <h3>{report.title}</h3>
                    <p>{report.description}</p>
                  </div>
                </div>
                <div className="report-features">
                  <h4>Features:</h4>
                  <ul>
                    {report.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="generate-btn">
                  Generate Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h2>📤 Export Options</h2>
          <div className="export-grid">
            <div className="export-card">
              <h3>📄 PDF Reports</h3>
              <p>Professional formatted reports for presentations and meetings</p>
              <button className="export-btn">Export as PDF</button>
            </div>
            <div className="export-card">
              <h3>📊 Excel Sheets</h3>
              <p>Detailed data for further analysis and custom calculations</p>
              <button className="export-btn">Export as Excel</button>
            </div>
            <div className="export-card">
              <h3>📧 Email Reports</h3>
              <p>Schedule automated reports to be sent to your team</p>
              <button className="export-btn">Setup Email Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 