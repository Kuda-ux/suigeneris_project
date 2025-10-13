import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Launch browser for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check if the development server is running
    console.log('📡 Checking if development server is running...');
    
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3001';
    
    try {
      const response = await page.goto(baseURL, { timeout: 10000 });
      
      if (response && response.status() === 200) {
        console.log('✅ Development server is running');
      } else {
        console.log('❌ Development server returned non-200 status');
        throw new Error(`Server returned status: ${response?.status()}`);
      }
    } catch (error) {
      console.log('❌ Development server is not running');
      console.log('Please start the development server with: npm run dev');
      throw new Error('Development server is not accessible');
    }

    // Verify critical pages are accessible
    console.log('🔍 Verifying critical pages...');
    
    const criticalPages = ['/', '/admin'];
    
    for (const pagePath of criticalPages) {
      try {
        const response = await page.goto(`${baseURL}${pagePath}`, { timeout: 10000 });
        if (response && response.status() < 400) {
          console.log(`✅ ${pagePath} is accessible`);
        } else {
          console.log(`⚠️  ${pagePath} returned status: ${response?.status()}`);
        }
      } catch (error) {
        console.log(`❌ ${pagePath} is not accessible:`, error);
      }
    }

    // Test API endpoints
    console.log('🔌 Testing API endpoints...');
    
    const apiEndpoints = [
      '/api/admin/users',
      '/api/admin/roles',
      '/api/admin/reports',
      '/api/admin/alerts'
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await page.request.get(`${baseURL}${endpoint}`);
        if (response.status() < 400) {
          console.log(`✅ API ${endpoint} is working`);
        } else {
          console.log(`⚠️  API ${endpoint} returned status: ${response.status()}`);
        }
      } catch (error) {
        console.log(`❌ API ${endpoint} failed:`, error);
      }
    }

    // Create test directories if they don't exist
    console.log('📁 Setting up test directories...');
    
    const fs = require('fs');
    const path = require('path');
    
    const testDirs = [
      'test-results',
      'test-results/screenshots',
      'test-results/videos',
      'test-results/traces'
    ];

    for (const dir of testDirs) {
      const dirPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      }
    }

    // Set up test data (if needed)
    console.log('💾 Setting up test data...');
    
    // You can add test data setup here
    // For example, creating test users, products, etc.
    
    console.log('✅ Global setup completed successfully!');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
