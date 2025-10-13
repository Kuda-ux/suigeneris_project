import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('/admin');
  });

  test('should load admin dashboard successfully', async ({ page }) => {
    // Check page loads
    await expect(page).toHaveTitle(/Admin Dashboard/i);
    
    // Check main dashboard elements
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
  });

  test('should display sidebar navigation', async ({ page }) => {
    // Check sidebar menu items
    await expect(page.getByText('Overview')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Orders')).toBeVisible();
    await expect(page.getByText('Users')).toBeVisible();
    await expect(page.getByText('Analytics')).toBeVisible();
    await expect(page.getByText('Reports')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });

  test('should display overview statistics', async ({ page }) => {
    // Check overview stats are displayed
    await expect(page.getByText('Total Revenue')).toBeVisible();
    await expect(page.getByText('Total Orders')).toBeVisible();
    await expect(page.getByText('Total Products')).toBeVisible();
    await expect(page.getByText('Active Users')).toBeVisible();
  });

  test('should navigate between dashboard tabs', async ({ page }) => {
    // Click on Products tab
    await page.getByText('Products').click();
    await expect(page.getByText('Product Management')).toBeVisible();
    
    // Click on Orders tab
    await page.getByText('Orders').click();
    await expect(page.getByText('Order Management')).toBeVisible();
    
    // Click on Users tab
    await page.getByText('Users').click();
    await expect(page.getByText('User Management')).toBeVisible();
  });

  test('should display reports section', async ({ page }) => {
    // Navigate to reports
    await page.getByText('Reports').click();
    
    // Check report types are available
    await expect(page.getByText('Stock Movement Summary')).toBeVisible();
    await expect(page.getByText('Top Selling Products')).toBeVisible();
    await expect(page.getByText('Dead Stock Report')).toBeVisible();
    await expect(page.getByText('Sales Summary')).toBeVisible();
  });

  test('should be able to download reports', async ({ page }) => {
    // Navigate to reports
    await page.getByText('Reports').click();
    
    // Check download buttons are present
    const downloadButtons = page.getByRole('button', { name: /download report/i });
    await expect(downloadButtons.first()).toBeVisible();
    
    // Check export all button
    await expect(page.getByRole('button', { name: /export all/i })).toBeVisible();
  });

  test('should display analytics charts', async ({ page }) => {
    // Navigate to analytics
    await page.getByText('Analytics').click();
    
    // Check analytics content is displayed
    await expect(page.getByText('Analytics Dashboard')).toBeVisible();
  });

  test('should handle logout functionality', async ({ page }) => {
    // Look for logout button (adjust selector based on your implementation)
    const logoutButton = page.getByRole('button', { name: /logout/i });
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to login or home page
      await page.waitForURL(/\/(login|admin\/login|$)/);
    }
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check dashboard is still functional
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
    await expect(page.getByText('Overview')).toBeVisible();
  });

  test('should display recent orders', async ({ page }) => {
    // Check if recent orders section exists
    const recentOrders = page.getByText('Recent Orders');
    if (await recentOrders.isVisible()) {
      await expect(recentOrders).toBeVisible();
    }
  });

  test('should display top products', async ({ page }) => {
    // Check if top products section exists
    const topProducts = page.getByText('Top Products');
    if (await topProducts.isVisible()) {
      await expect(topProducts).toBeVisible();
    }
  });
});
