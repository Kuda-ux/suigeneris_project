import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Homepage should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Homepage loaded in ${loadTime}ms`);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcpMetric = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    // LCP should be under 2.5 seconds (good)
    expect(lcpMetric).toBeLessThan(2500);
  });

  test('should have minimal layout shift', async ({ page }) => {
    await page.goto('/');
    
    // Measure Cumulative Layout Shift (CLS)
    const clsMetric = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Resolve after a delay to capture shifts
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    
    // CLS should be under 0.1 (good)
    expect(clsMetric).toBeLessThan(0.1);
  });

  test('images should load efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that images have proper loading attributes
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const loading = await img.getAttribute('loading');
        const src = await img.getAttribute('src');
        
        // Images should have loading="lazy" or be critical images
        if (src && !src.includes('logo')) {
          // Non-critical images should be lazy loaded
          expect(loading).toBe('lazy');
        }
      }
    }
  });

  test('should have efficient resource loading', async ({ page }) => {
    const resourceSizes: { [key: string]: number } = {};
    
    page.on('response', async (response) => {
      const url = response.url();
      const size = parseInt(response.headers()['content-length'] || '0');
      
      if (url.includes('.js')) {
        resourceSizes.javascript = (resourceSizes.javascript || 0) + size;
      } else if (url.includes('.css')) {
        resourceSizes.css = (resourceSizes.css || 0) + size;
      } else if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        resourceSizes.images = (resourceSizes.images || 0) + size;
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // JavaScript bundle should be reasonable size (under 1MB)
    if (resourceSizes.javascript) {
      expect(resourceSizes.javascript).toBeLessThan(1024 * 1024);
    }
    
    // CSS should be reasonable size (under 200KB)
    if (resourceSizes.css) {
      expect(resourceSizes.css).toBeLessThan(200 * 1024);
    }
    
    console.log('Resource sizes:', resourceSizes);
  });

  test('should handle concurrent users', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);
    
    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );
    
    const startTime = Date.now();
    
    // Simulate 3 concurrent users
    await Promise.all(
      pages.map(async (page, index) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        // Simulate user interactions
        await page.getByRole('link', { name: /shop now/i }).click();
        await page.waitForLoadState('networkidle');
      })
    );
    
    const totalTime = Date.now() - startTime;
    
    // Should handle concurrent users efficiently
    expect(totalTime).toBeLessThan(15000); // 15 seconds for 3 users
    
    // Clean up
    await Promise.all(contexts.map(context => context.close()));
  });

  test('admin dashboard performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Admin dashboard should load within 8 seconds (more complex)
    expect(loadTime).toBeLessThan(8000);
    
    // Test navigation between tabs
    const tabStartTime = Date.now();
    await page.getByText('Products').click();
    await page.waitForLoadState('networkidle');
    const tabLoadTime = Date.now() - tabStartTime;
    
    // Tab switching should be fast
    expect(tabLoadTime).toBeLessThan(2000);
  });

  test('should handle large data sets efficiently', async ({ page }) => {
    // Test admin reports with potentially large data
    await page.goto('/admin');
    await page.getByText('Reports').click();
    
    const reportStartTime = Date.now();
    
    // Click on a report that might have large data
    const stockReportButton = page.getByText('Stock Movement Summary');
    if (await stockReportButton.isVisible()) {
      await stockReportButton.click();
      await page.waitForLoadState('networkidle');
    }
    
    const reportLoadTime = Date.now() - reportStartTime;
    
    // Reports should load within reasonable time
    expect(reportLoadTime).toBeLessThan(5000);
  });

  test('should optimize for mobile performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const mobileLoadTime = Date.now() - startTime;
    
    // Mobile should load within 6 seconds (accounting for slower connections)
    expect(mobileLoadTime).toBeLessThan(6000);
    
    console.log(`Mobile load time: ${mobileLoadTime}ms`);
  });

  test('should have efficient API response times', async ({ page }) => {
    const apiTimes: { [key: string]: number } = {};
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/api/')) {
        const timing = response.timing();
        apiTimes[url] = timing.responseEnd - timing.requestStart;
      }
    });
    
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // Check API response times
    for (const [url, time] of Object.entries(apiTimes)) {
      // API calls should respond within 3 seconds
      expect(time).toBeLessThan(3000);
      console.log(`API ${url}: ${time}ms`);
    }
  });
});
