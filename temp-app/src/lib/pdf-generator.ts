// PDF generation utility without external dependencies
export class PDFGenerator {
  static async generateStockMovementReport(data: any) {
    const reportContent = this.createStockMovementHTML(data);
    return this.downloadHTML(reportContent, 'stock-movement-report.html');
  }

  static async generateTopSellingReport(data: any[]) {
    const reportContent = this.createTopSellingHTML(data);
    return this.downloadHTML(reportContent, 'top-selling-report.html');
  }

  static async generateDeadStockReport(data: any[]) {
    const reportContent = this.createDeadStockHTML(data);
    return this.downloadHTML(reportContent, 'dead-stock-report.html');
  }

  static async generateSalesSummaryReport(salesData: any[], categoryData: any[]) {
    const reportContent = this.createSalesSummaryHTML(salesData, categoryData);
    return this.downloadHTML(reportContent, 'sales-summary-report.html');
  }

  private static createStockMovementHTML(data: any): string {
    const currentDate = new Date().toLocaleDateString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Stock Movement Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
        .report-title { font-size: 20px; margin: 10px 0; }
        .date { color: #666; }
        .summary-cards { display: flex; gap: 20px; margin: 20px 0; }
        .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; flex: 1; }
        .card-title { font-size: 14px; color: #666; margin-bottom: 5px; }
        .card-value { font-size: 24px; font-weight: bold; }
        .issued { color: #dc2626; }
        .received { color: #16a34a; }
        .returns { color: #ca8a04; }
        .net { color: #1e40af; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8fafc; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SUI GENERIS STORE</div>
        <div class="report-title">Stock Movement Report</div>
        <div class="date">Generated on: ${currentDate}</div>
    </div>

    <div class="summary-cards">
        <div class="card">
            <div class="card-title">Total Issued</div>
            <div class="card-value issued">${data.totalIssued || 0}</div>
        </div>
        <div class="card">
            <div class="card-title">Total Received</div>
            <div class="card-value received">${data.totalReceived || 0}</div>
        </div>
        <div class="card">
            <div class="card-title">Total Returns</div>
            <div class="card-value returns">${data.totalReturns || 0}</div>
        </div>
        <div class="card">
            <div class="card-title">Net Movement</div>
            <div class="card-value net">${data.netMovement || 0}</div>
        </div>
    </div>

    <h3>Top Issued Products</h3>
    <table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity Issued</th>
            </tr>
        </thead>
        <tbody>
            ${data.topIssuedProducts?.map((product: any) => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                </tr>
            `).join('') || '<tr><td colspan="2">No data available</td></tr>'}
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by Sui Generis Store Admin System</p>
        <p>Report ID: SM-${Date.now()}</p>
    </div>
</body>
</html>`;
  }

  private static createTopSellingHTML(data: any[]): string {
    const currentDate = new Date().toLocaleDateString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Top Selling Products Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
        .report-title { font-size: 20px; margin: 10px 0; }
        .date { color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8fafc; font-weight: bold; }
        .growth-positive { color: #16a34a; }
        .growth-negative { color: #dc2626; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SUI GENERIS STORE</div>
        <div class="report-title">Top Selling Products Report</div>
        <div class="date">Generated on: ${currentDate}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Growth %</th>
            </tr>
        </thead>
        <tbody>
            ${data.map((product: any, index: number) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.unitsSold}</td>
                    <td>$${product.revenue.toLocaleString()}</td>
                    <td class="${product.growth >= 0 ? 'growth-positive' : 'growth-negative'}">
                        ${product.growth >= 0 ? '+' : ''}${product.growth}%
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by Sui Generis Store Admin System</p>
        <p>Report ID: TS-${Date.now()}</p>
    </div>
</body>
</html>`;
  }

  private static createDeadStockHTML(data: any[]): string {
    const currentDate = new Date().toLocaleDateString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dead Stock Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
        .report-title { font-size: 20px; margin: 10px 0; }
        .date { color: #666; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8fafc; font-weight: bold; }
        .days-high { color: #dc2626; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SUI GENERIS STORE</div>
        <div class="report-title">Dead Stock Analysis Report</div>
        <div class="date">Generated on: ${currentDate}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Days Without Sale</th>
                <th>Current Stock</th>
                <th>Last Sale Date</th>
            </tr>
        </thead>
        <tbody>
            ${data.map((item: any) => `
                <tr>
                    <td>${item.name}</td>
                    <td class="${item.daysWithoutSale > 30 ? 'days-high' : ''}">${item.daysWithoutSale} days</td>
                    <td>${item.currentStock}</td>
                    <td>${new Date(item.lastSale).toLocaleDateString()}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by Sui Generis Store Admin System</p>
        <p>Report ID: DS-${Date.now()}</p>
    </div>
</body>
</html>`;
  }

  private static createSalesSummaryHTML(salesData: any[], categoryData: any[]): string {
    const currentDate = new Date().toLocaleDateString();
    const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
    const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sales Summary Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #1e40af; }
        .report-title { font-size: 20px; margin: 10px 0; }
        .date { color: #666; }
        .summary-cards { display: flex; gap: 20px; margin: 20px 0; }
        .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
        .card-title { font-size: 14px; color: #666; margin-bottom: 5px; }
        .card-value { font-size: 24px; font-weight: bold; color: #1e40af; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8fafc; font-weight: bold; }
        .section-title { font-size: 18px; margin: 30px 0 15px 0; color: #1e40af; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SUI GENERIS STORE</div>
        <div class="report-title">Sales Summary Report</div>
        <div class="date">Generated on: ${currentDate}</div>
    </div>

    <div class="summary-cards">
        <div class="card">
            <div class="card-title">Total Revenue</div>
            <div class="card-value">$${totalRevenue.toLocaleString()}</div>
        </div>
        <div class="card">
            <div class="card-title">Total Sales</div>
            <div class="card-value">${totalSales.toLocaleString()}</div>
        </div>
        <div class="card">
            <div class="card-title">Categories</div>
            <div class="card-value">${categoryData.length}</div>
        </div>
    </div>

    <div class="section-title">Monthly Sales Performance</div>
    <table>
        <thead>
            <tr>
                <th>Month</th>
                <th>Sales</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
            ${salesData.map((item: any) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.sales.toLocaleString()}</td>
                    <td>$${item.revenue.toLocaleString()}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="section-title">Category Performance</div>
    <table>
        <thead>
            <tr>
                <th>Category</th>
                <th>Sales</th>
                <th>Market Share %</th>
            </tr>
        </thead>
        <tbody>
            ${categoryData.map((item: any) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.sales.toLocaleString()}</td>
                    <td>${item.value}%</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by Sui Generis Store Admin System</p>
        <p>Report ID: SS-${Date.now()}</p>
    </div>
</body>
</html>`;
  }

  private static downloadHTML(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
