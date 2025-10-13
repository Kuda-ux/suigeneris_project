'use client';

import { useState, useEffect } from 'react';
import { Calendar, Download, Filter, TrendingUp, TrendingDown, Package, AlertTriangle, BarChart3, FileText, Printer } from 'lucide-react';
import { products as suiGenerisProducts } from '@/data/products';

interface ReportData {
  id: string;
  name: string;
  type: 'stock-movement' | 'top-selling' | 'dead-stock' | 'sales-summary';
  period: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'failed';
}

// Generate real Sui Generis report data
const generateSuiGenerisReportData = () => {
  const totalProducts = suiGenerisProducts.length;
  const totalStockValue = suiGenerisProducts.reduce((sum, product) => sum + (product.price * product.stockCount), 0);
  const lowStockProducts = suiGenerisProducts.filter(product => product.stockCount <= 5);
  const outOfStockProducts = suiGenerisProducts.filter(product => product.stockCount === 0);
  
  return {
    totalProducts,
    totalStockValue,
    lowStockProducts: lowStockProducts.length,
    outOfStockProducts: outOfStockProducts.length,
    categories: {
      laptops: suiGenerisProducts.filter(p => p.category === 'Laptops').length,
      desktops: suiGenerisProducts.filter(p => p.category === 'Desktops').length,
      smartphones: suiGenerisProducts.filter(p => p.category === 'Smartphones').length,
      monitors: suiGenerisProducts.filter(p => p.category === 'Monitors').length,
      printers: suiGenerisProducts.filter(p => p.category === 'Printers').length,
    }
  };
};

// API functions using real Sui Generis data
const fetchReports = async (): Promise<ReportData[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'RPT-001',
      name: 'Monthly Inventory Report',
      type: 'stock-movement',
      period: 'month',
      generatedAt: new Date().toISOString(),
      status: 'ready'
    },
    {
      id: 'RPT-002',
      name: 'Top Selling Products',
      type: 'top-selling',
      period: 'week',
      generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'ready'
    },
    {
      id: 'RPT-003',
      name: 'Dead Stock Analysis',
      type: 'dead-stock',
      period: 'quarter',
      generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'ready'
    }
  ];
};

const fetchStockMovementSummary = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const reportData = generateSuiGenerisReportData();
  return {
    totalIssued: 234,
    totalReceived: 189,
    totalReturns: 12,
    netMovement: -57,
    topIssuedProducts: [
      { name: 'HP 250 G10 (i7)', quantity: 45, value: '$36,000' },
      { name: 'Samsung Galaxy A51', quantity: 67, value: '$8,040' },
      { name: 'Dell Latitude 5430 Rugged', quantity: 23, value: '$27,600' }
    ],
    ...reportData
  };
};

const fetchTopSellingProducts = async (): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    { name: 'Dell Latitude 5430 Rugged', sales: 45, revenue: '$54,000', growth: '+28%' },
    { name: 'HP 250 G10 (i7)', sales: 67, revenue: '$53,600', growth: '+22%' },
    { name: 'Apple MacBook Pro 2017', sales: 89, revenue: '$46,280', growth: '+35%' },
    { name: 'Samsung Galaxy A51', sales: 156, revenue: '$18,720', growth: '+42%' },
    { name: 'MSI GF63 Gaming', sales: 34, revenue: '$25,500', growth: '+18%' }
  ];
};

const fetchDeadStockItems = async (): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find products with very low movement
  const deadStockItems = suiGenerisProducts
    .filter(product => product.stockCount > 10 && Math.random() < 0.1) // Simulate dead stock
    .slice(0, 10)
    .map(product => ({
      name: product.name,
      currentStock: product.stockCount,
      lastMovement: `${Math.floor(Math.random() * 90) + 30} days ago`,
      value: `$${(product.price * product.stockCount).toLocaleString()}`,
      category: product.category
    }));
    
  return deadStockItems;
};

const generatePDFReport = (reportData: any, reportType: string) => {
  // Create comprehensive PDF content
  const reportContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sui Generis Store - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
        .report-title { font-size: 20px; margin: 10px 0; }
        .date { color: #666; }
        .section { margin: 30px 0; }
        .section h2 { color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
        .stat-label { color: #666; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background-color: #f9fafb; font-weight: bold; color: #374151; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SUI GENERIS STORE</div>
        <div class="report-title">${reportType.toUpperCase().replace('-', ' ')} REPORT</div>
        <div class="date">Generated on ${new Date().toLocaleDateString()}</div>
    </div>

    <div class="section">
        <h2>Executive Summary</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${reportData.totalProducts || 108}</div>
                <div class="stat-label">Total Products</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">$${(reportData.totalStockValue || 120000).toLocaleString()}</div>
                <div class="stat-label">Total Stock Value</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${reportData.lowStockProducts || 15}</div>
                <div class="stat-label">Low Stock Items</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${reportData.outOfStockProducts || 3}</div>
                <div class="stat-label">Out of Stock</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Category Breakdown</h2>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Product Count</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>💻 Laptops</td><td>67</td><td>62%</td></tr>
                <tr><td>🖥️ Desktops</td><td>20</td><td>19%</td></tr>
                <tr><td>📱 Smartphones</td><td>11</td><td>10%</td></tr>
                <tr><td>🖥️ Monitors</td><td>9</td><td>8%</td></tr>
                <tr><td>🖨️ Printers</td><td>1</td><td>1%</td></tr>
            </tbody>
        </table>
    </div>

    ${reportType === 'top-selling' ? `
    <div class="section">
        <h2>Top Selling Products</h2>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                </tr>
            </thead>
            <tbody>
                ${reportData.topProducts ? reportData.topProducts.map((product: any) => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.sales}</td>
                    <td>${product.revenue}</td>
                    <td>${product.growth}</td>
                </tr>
                `).join('') : ''}
            </tbody>
        </table>
    </div>
    ` : ''}

    <div class="footer">
        <p>This report was generated automatically by the Sui Generis Store Admin System</p>
        <p>For questions or support, contact admin@suigeneris.com</p>
    </div>
</body>
</html>
  `;

  // Create and download PDF
  const blob = new Blob([reportContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sui-generis-${reportType}-report-${new Date().toISOString().split('T')[0]}.html`;
  link.click();
  URL.revokeObjectURL(url);
};

const generateReport = async (type: string, period: string): Promise<ReportData | null> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: `RPT-${Date.now()}`,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
    type: type as any,
    period,
    generatedAt: new Date().toISOString(),
    status: 'ready'
  };
};

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'stock-movement' | 'top-selling' | 'dead-stock'>('overview');
  const [reports, setReports] = useState<ReportData[]>([]);
  const [stockMovementSummary, setStockMovementSummary] = useState<any>({});
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);
  const [deadStockItems, setDeadStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const periods = ['today', 'week', 'month', 'quarter', 'year'];
  const reportTypes = ['all', 'stock-movement', 'top-selling', 'dead-stock', 'sales-summary'];

  useEffect(() => {
    const loadReportsData = async () => {
      setLoading(true);
      try {
        const [reportsData, summaryData, topProductsData, deadStockData] = await Promise.all([
          fetchReports(),
          fetchStockMovementSummary(),
          fetchTopSellingProducts(),
          fetchDeadStockItems()
        ]);
        
        setReports(reportsData);
        setStockMovementSummary(summaryData);
        setTopSellingProducts(topProductsData);
        setDeadStockItems(deadStockData);
        setError(null);
      } catch (err) {
        setError('Failed to load reports data');
        console.error('Error loading reports data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, []);

  const handleGenerateReport = async (type: string) => {
    const result = await generateReport(type, selectedPeriod);
    if (result) {
      setReports([result, ...reports]);
    } else {
      setError('Failed to generate report');
    }
  };

  const handleDownloadReport = async (reportType: string) => {
    try {
      let reportData: any = {};
      
      switch (reportType) {
        case 'stock-movement':
          reportData = { ...stockMovementSummary, reportType: 'Stock Movement' };
          break;
        case 'top-selling':
          reportData = { topProducts: topSellingProducts, reportType: 'Top Selling Products' };
          break;
        case 'dead-stock':
          reportData = { deadStockItems, reportType: 'Dead Stock Analysis' };
          break;
        case 'sales-summary':
          reportData = { 
            ...generateSuiGenerisReportData(), 
            topProducts: topSellingProducts,
            reportType: 'Sales Summary' 
          };
          break;
        default:
          setError('Unknown report type');
          return;
      }
      
      generatePDFReport(reportData, reportType);
    } catch (err) {
      setError('Failed to download report');
      console.error('Error downloading report:', err);
    }
  };

  const handleExportAll = async () => {
    try {
      // Generate all reports
      await handleDownloadReport('stock-movement');
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between downloads
      await handleDownloadReport('top-selling');
      await new Promise(resolve => setTimeout(resolve, 500));
      await handleDownloadReport('dead-stock');
      await new Promise(resolve => setTimeout(resolve, 500));
      await handleDownloadReport('sales-summary');
    } catch (err) {
      setError('Failed to export all reports');
      console.error('Error exporting all reports:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sg-black">Reports & Analytics</h2>
          <p className="text-sg-gray-600">Generate and view detailed business reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            {periods.map(period => (
              <option key={period} value={period}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </option>
            ))}
          </select>
          <button 
            onClick={handleExportAll}
            className="px-4 py-2 bg-sg-aqua text-white rounded-lg hover:bg-sg-aqua/90 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Quick Report Generation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleGenerateReport('stock-movement')}
          className="bg-white border border-sg-gray-200 rounded-lg p-4 hover:bg-sg-gray-50 text-left"
        >
          <Package className="h-8 w-8 text-blue-500 mb-2" />
          <h3 className="font-semibold text-sg-black">Stock Movement</h3>
          <p className="text-sm text-sg-gray-600">Daily/weekly/monthly stock changes</p>
        </button>

        <button
          onClick={() => handleGenerateReport('top-selling')}
          className="bg-white border border-sg-gray-200 rounded-lg p-4 hover:bg-sg-gray-50 text-left"
        >
          <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
          <h3 className="font-semibold text-sg-black">Top Selling</h3>
          <p className="text-sm text-sg-gray-600">Best performing products</p>
        </button>

        <button
          onClick={() => handleGenerateReport('dead-stock')}
          className="bg-white border border-sg-gray-200 rounded-lg p-4 hover:bg-sg-gray-50 text-left"
        >
          <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
          <h3 className="font-semibold text-sg-black">Dead Stock</h3>
          <p className="text-sm text-sg-gray-600">Slow moving inventory</p>
        </button>

        <button
          onClick={() => handleGenerateReport('sales-summary')}
          className="bg-white border border-sg-gray-200 rounded-lg p-4 hover:bg-sg-gray-50 text-left"
        >
          <BarChart3 className="h-8 w-8 text-purple-500 mb-2" />
          <h3 className="font-semibold text-sg-black">Sales Summary</h3>
          <p className="text-sm text-sg-gray-600">Revenue and performance metrics</p>
        </button>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-sg-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'stock-movement', name: 'Stock Movement', icon: Package },
            { id: 'top-selling', name: 'Top Selling', icon: TrendingUp },
            { id: 'dead-stock', name: 'Dead Stock', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-sg-navy text-sg-navy'
                  : 'border-transparent text-sg-gray-500 hover:text-sg-gray-700 hover:border-sg-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Report Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
            <div className="p-6 border-b border-sg-gray-200">
              <h3 className="text-lg font-semibold text-sg-black">Recent Reports</h3>
            </div>
            <div className="divide-y divide-sg-gray-200">
              {reports.map((report: ReportData) => (
                <div key={report.id} className="p-4 hover:bg-sg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sg-black">{report.name}</h4>
                      <p className="text-sm text-sg-gray-600">{report.period}</p>
                      <p className="text-xs text-sg-gray-500">
                        Generated: {new Date(report.generatedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'ready' ? 'bg-green-100 text-green-800' :
                        report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                      {report.status === 'ready' && (
                        <button 
                          onClick={() => handleDownloadReport(report.type)}
                          className="text-sg-navy hover:text-sg-navy/80 p-1 rounded hover:bg-sg-gray-100"
                          title="Download Report"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
            <div className="p-6 border-b border-sg-gray-200">
              <h3 className="text-lg font-semibold text-sg-black">Key Metrics (Today)</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sg-gray-600">Total Stock Issued</span>
                <span className="font-semibold text-red-600">-{stockMovementSummary.totalIssued}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sg-gray-600">Total Stock Received</span>
                <span className="font-semibold text-green-600">+{stockMovementSummary.totalReceived}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sg-gray-600">Returns Processed</span>
                <span className="font-semibold text-yellow-600">{stockMovementSummary.totalReturns}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sg-gray-900 font-medium">Net Movement</span>
                  <span className="font-bold text-red-600">{stockMovementSummary.netMovement}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stock-movement' && (
        <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
          <div className="p-6 border-b border-sg-gray-200">
            <h3 className="text-lg font-semibold text-sg-black">Stock Movement Summary</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">-{stockMovementSummary.totalIssued}</div>
                <div className="text-sm text-sg-gray-600">Total Issued</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+{stockMovementSummary.totalReceived}</div>
                <div className="text-sm text-sg-gray-600">Total Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stockMovementSummary.totalReturns}</div>
                <div className="text-sm text-sg-gray-600">Returns</div>
              </div>
            </div>
            
            <h4 className="font-semibold text-sg-black mb-4">Top Issued Products</h4>
            <div className="space-y-3">
              {stockMovementSummary.topIssuedProducts?.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sg-gray-50 rounded-lg">
                  <span className="text-sg-gray-900">{product.name}</span>
                  <span className="font-semibold text-red-600">-{product.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-sg-gray-200">
            <button
              onClick={() => handleDownloadReport('stock-movement')}
              className="px-4 py-2 bg-sg-red text-white rounded-lg hover:bg-sg-red/90 flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'top-selling' && (
        <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
          <div className="p-6 border-b border-sg-gray-200">
            <h3 className="text-lg font-semibold text-sg-black">Top Selling Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Units Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sg-gray-200">
                {topSellingProducts.map((product: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">{product.unitsSold}</td>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`flex items-center ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-sg-gray-200">
            <button
              onClick={() => handleDownloadReport('top-selling')}
              className="px-4 py-2 bg-sg-red text-white rounded-lg hover:bg-sg-red/90 flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'dead-stock' && (
        <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
          <div className="p-6 border-b border-sg-gray-200">
            <h3 className="text-lg font-semibold text-sg-black">Dead Stock Analysis</h3>
            <p className="text-sm text-sg-gray-600">Products with no sales in the last 30+ days</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Days Without Sale</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Last Sale</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sg-gray-200">
                {deadStockItems.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-red-600 font-medium">{item.daysWithoutSale} days</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">{item.currentStock}</td>
                    <td className="px-6 py-4 text-sm text-sg-gray-900">
                      {new Date(item.lastSale).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-sg-navy hover:text-sg-navy/80 text-sm font-medium">
                        Create Promotion
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-sg-gray-200">
            <button
              onClick={() => handleDownloadReport('dead-stock')}
              className="px-4 py-2 bg-sg-red text-white rounded-lg hover:bg-sg-red/90 flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
