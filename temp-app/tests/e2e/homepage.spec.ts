import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Sui Generis/i);
    
    // Check hero section is visible
    await expect(page.getByText('Premium Tech Store')).toBeVisible();
    await expect(page.getByText('Get the Latest Gadgets at Unbeatable Prices!')).toBeVisible();
  });

  test('should display hero section with sale banner', async ({ page }) => {
    // Check sale banner
    await expect(page.getByText('🔥 SALE: Up to 50% OFF Premium Tech!')).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /browse categories/i })).toBeVisible();
  });

  test('should display product showcase in hero section', async ({ page }) => {
    // Check hot deals banner
    await expect(page.getByText('🔥 HOT DEALS TODAY!')).toBeVisible();
    
    // Check featured product in hero
    await expect(page.getByText('Premium Wireless Headphones')).toBeVisible();
    await expect(page.getByText('Smart Watch')).toBeVisible();
    await expect(page.getByText('Wireless Earbuds')).toBeVisible();
  });

  test('should display product pricing and offers', async ({ page }) => {
    // Check pricing displays
    await expect(page.getByText('$199')).toBeVisible();
    await expect(page.getByText('$399')).toBeVisible(); // Original price
    await expect(page.getByText('50% OFF')).toBeVisible();
    
    // Check add to cart button
    await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();
  });

  test('should display shop by category section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('Shop by Category')).toBeVisible();
    
    // Check categories are displayed
    await expect(page.getByText('Electronics')).toBeVisible();
    await expect(page.getByText('Audio')).toBeVisible();
    await expect(page.getByText('Wearables')).toBeVisible();
  });

  test('should have clickable CTA buttons', async ({ page }) => {
    // Check shop now button is clickable
    const shopNowButton = page.getByRole('link', { name: /shop now/i });
    await expect(shopNowButton).toBeVisible();
    await expect(shopNowButton).toBeEnabled();
    
    // Check browse categories button is clickable
    const browseCategoriesButton = page.getByRole('link', { name: /browse categories/i });
    await expect(browseCategoriesButton).toBeVisible();
    await expect(browseCategoriesButton).toBeEnabled();
  });

  test('should display urgency messaging', async ({ page }) => {
    // Check urgency banner
    await expect(page.getByText('⏰ Sale ends in 24 hours! Order now!')).toBeVisible();
    
    // Check limited time offer text
    await expect(page.getByText('Limited Time Offers - Don\'t Miss Out!')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check hero section is still visible and readable
    await expect(page.getByText('Premium Tech Store')).toBeVisible();
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible();
  });

  test('should load all images successfully', async ({ page }) => {
    // Wait for all images to load
    await page.waitForLoadState('networkidle');
    
    // Check that no images have broken src
    const brokenImages = await page.locator('img[src=""], img:not([src])').count();
    expect(brokenImages).toBe(0);
  });

  test('should display trust indicators', async ({ page }) => {
    // Check trust indicators
    await expect(page.getByText('✅ Free Shipping on Orders $50+')).toBeVisible();
    await expect(page.getByText('✅ 30-Day Money Back Guarantee')).toBeVisible();
    await expect(page.getByText('✅ 24/7 Customer Support')).toBeVisible();
  });
});
