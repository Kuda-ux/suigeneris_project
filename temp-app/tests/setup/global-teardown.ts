import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');

  try {
    // Clean up test data
    console.log('💾 Cleaning up test data...');
    
    // Add any cleanup logic here
    // For example, removing test users, orders, etc.
    
    // Generate test summary
    console.log('📊 Generating test summary...');
    
    const fs = require('fs');
    const path = require('path');
    
    const testResultsPath = path.join(process.cwd(), 'test-results');
    
    if (fs.existsSync(testResultsPath)) {
      const files = fs.readdirSync(testResultsPath);
      console.log(`📁 Test results directory contains ${files.length} files`);
    }

    console.log('✅ Global teardown completed successfully!');

  } catch (error) {
    console.error('❌ Global teardown failed:', error);
  }
}

export default globalTeardown;
