import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({ userEmail, onLogout }) => {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState([]);

  // Generate 5 years of historical data
  const generateHistoricalData = () => {
    const data = [];
    const startYear = new Date().getFullYear() - 5;
    const currentDate = new Date();
    
    for (let year = startYear; year <= currentDate.getFullYear(); year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        if (date <= currentDate) {
          data.push({
            date,
            monthName: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            revenue: Math.floor(Math.random() * 50000) + 20000,
            sales: Math.floor(Math.random() * 100) + 50,
            conversionRate: Math.floor(Math.random() * 30) + 15,
            activeLeads: Math.floor(Math.random() * 200) + 100
          });
        }
      }
    }
    return data;
  };

  useEffect(() => {
    const data = generateHistoricalData();
    setHistoricalData(data);
  }, []);

  // Filter data based on date range
  const getFilteredData = () => {
    return historicalData.filter(item => {
      return item.date >= startDate && item.date <= endDate;
    });
  };

  // Calculate stats from filtered data
  const generateStats = (filteredData) => {
    if (filteredData.length === 0) {
      return [
        { title: 'Total Revenue', value: '₹0', change: '0%', icon: '💰' },
        { title: 'Total Sales', value: '0', change: '0%', icon: '📈' },
        { title: 'Avg Conversion Rate', value: '0%', change: '0%', icon: '🎯' },
        { title: 'Active Leads', value: '0', change: '0%', icon: '👥' }
      ];
    }

    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    const avgConversionRate = filteredData.reduce((sum, item) => sum + item.conversionRate, 0) / filteredData.length;
    const totalLeads = filteredData.reduce((sum, item) => sum + item.activeLeads, 0);

    return [
      { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: '+12.5%', icon: '💰' },
      { title: 'Total Sales', value: totalSales.toLocaleString('en-IN'), change: '+8.2%', icon: '📈' },
      { title: 'Avg Conversion Rate', value: `${avgConversionRate.toFixed(1)}%`, change: '+3.1%', icon: '🎯' },
      { title: 'Active Leads', value: Math.floor(totalLeads / filteredData.length).toLocaleString('en-IN'), change: '+15.3%', icon: '👥' }
    ];
  };

  // Get chart data based on filtered historical data
  const getChartData = (filteredData) => {
    if (filteredData.length === 0) {
      return {
        salesData: { labels: [], datasets: [] },
        revenueData: { labels: [], datasets: [] },
        conversionData: { labels: [], datasets: [] }
      };
    }

    const sortedData = [...filteredData].sort((a, b) => a.date - b.date);
    const recentData = sortedData.slice(-12);
    
    return {
      salesData: {
        labels: recentData.map(item => item.monthName),
        datasets: [
          {
            label: 'Revenue (₹)',
            data: recentData.map(item => item.revenue),
            borderColor: 'rgb(100, 108, 255)',
            backgroundColor: 'rgba(100, 108, 255, 0.2)',
            tension: 0.4,
          },
        ],
      },
      revenueData: {
        labels: recentData.map(item => item.monthName),
        datasets: [
          {
            label: 'Sales',
            data: recentData.map(item => item.sales),
            backgroundColor: [
              'rgba(100, 108, 255, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(59, 130, 246, 0.8)',
            ],
          },
        ],
      },
      conversionData: {
        labels: ['Leads', 'Qualified', 'Proposals', 'Closed'],
        datasets: [
          {
            data: [300, 180, 90, 45],
            backgroundColor: [
              'rgba(100, 108, 255, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
          },
        ],
      },
    };
  };

  const filteredData = getFilteredData();
  const stats = generateStats(filteredData);
  const chartData = getChartData(filteredData);

  return (
    <div className="dashboard-container">
      {/* Date Filter Header */}
      <div className="dashboard-filter-header">
        <div className="date-filter">
          <h4>Data Range</h4>
          <p className="date-filter-help">
            💡 Select date range to filter dashboard data
          </p>
          <div className="date-pickers">
            <div className="date-picker-group">
              <label>From:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                minDate={new Date(new Date().getFullYear() - 5, 0, 1)}
                withPortal
                portalId="date-picker-portal"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
            <div className="date-picker-group">
              <label>To:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                withPortal
                portalId="date-picker-portal"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="quick-filters">
            <button 
              className="quick-filter-btn"
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 3);
                setStartDate(start);
                setEndDate(end);
              }}
            >
              Last 3 Months
            </button>
            <button 
              className="quick-filter-btn"
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setFullYear(start.getFullYear() - 1);
                setStartDate(start);
                setEndDate(end);
              }}
            >
              Last Year
            </button>
            <button 
              className="quick-filter-btn"
              onClick={() => {
                const end = new Date();
                const start = new Date();
                start.setFullYear(start.getFullYear() - 5);
                setStartDate(start);
                setEndDate(end);
              }}
            >
              Last 5 Years
            </button>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="data-summary">
        <div className="summary-info">
          <span className="summary-text">
            📊 Showing data from <strong>{startDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</strong> to <strong>{endDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</strong>
          </span>
          <span className="data-points">
            ({filteredData.length} data points)
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <Line 
            data={chartData.salesData} 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Revenue Performance' }
              }
            }}
          />
        </div>
        <div className="chart-card">
          <h3>Sales Performance</h3>
          <Bar 
            data={chartData.revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Sales Volume' }
              }
            }}
          />
        </div>
        <div className="chart-card">
          <h3>Conversion Funnel</h3>
          <Doughnut 
            data={chartData.conversionData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Sales Funnel Performance' }
              }
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn primary">
            <span className="action-icon">➕</span>
            Add New Lead
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            Generate Report
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📧</span>
            Send Campaign
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">⚙️</span>
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 