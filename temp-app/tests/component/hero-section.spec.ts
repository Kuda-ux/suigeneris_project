import { test, expect } from '@playwright/test';

test.describe('Hero Section Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render hero section with correct content', async ({ page }) => {
    // Check main heading
    await expect(page.getByText('Premium')).toBeVisible();
    await expect(page.getByText('Tech Store')).toBeVisible();
    
    // Check subheading
    await expect(page.getByText('Get the Latest Gadgets at Unbeatable Prices!')).toBeVisible();
    
    // Check sale banner
    await expect(page.getByText('🔥 SALE: Up to 50% OFF Premium Tech!')).toBeVisible();
  });

  test('should display trust indicators', async ({ page }) => {
    // Check trust indicators
    await expect(page.getByText('✅ Free Shipping on Orders $50+')).toBeVisible();
    await expect(page.getByText('✅ 30-Day Money Back Guarantee')).toBeVisible();
    await expect(page.getByText('✅ 24/7 Customer Support')).toBeVisible();
  });

  test('should display statistics', async ({ page }) => {
    // Check stats
    await expect(page.getByText('50K+')).toBeVisible();
    await expect(page.getByText('Happy Customers')).toBeVisible();
    await expect(page.getByText('4.9')).toBeVisible();
    await expect(page.getByText('Customer Rating')).toBeVisible();
    await expect(page.getByText('24/7')).toBeVisible();
    await expect(page.getByText('Support')).toBeVisible();
  });

  test('should display CTA buttons with correct styling', async ({ page }) => {
    const shopNowButton = page.getByRole('link', { name: /🛒 SHOP NOW - Save Big!/i });
    const browseCategoriesButton = page.getByRole('link', { name: /Browse Categories/i });
    
    // Check buttons are visible
    await expect(shopNowButton).toBeVisible();
    await expect(browseCategoriesButton).toBeVisible();
    
    // Check buttons are clickable
    await expect(shopNowButton).toBeEnabled();
    await expect(browseCategoriesButton).toBeEnabled();
    
    // Check button styling (background colors)
    await expect(shopNowButton).toHaveClass(/bg-sg-red/);
    await expect(browseCategoriesButton).toHaveClass(/border-sg-aqua/);
  });

  test('should display product showcase', async ({ page }) => {
    // Check hot deals banner
    await expect(page.getByText('🔥 HOT DEALS TODAY!')).toBeVisible();
    await expect(page.getByText('Limited Time Offers - Don\'t Miss Out!')).toBeVisible();
    
    // Check featured product
    await expect(page.getByText('Premium Wireless Headphones')).toBeVisible();
    await expect(page.getByText('$199')).toBeVisible();
    await expect(page.getByText('$399')).toBeVisible(); // Original price
    await expect(page.getByText('50% OFF')).toBeVisible();
    
    // Check add to cart button
    await expect(page.getByRole('button', { name: /🛒 Add to Cart - Save \$200!/i })).toBeVisible();
  });

  test('should display secondary products', async ({ page }) => {
    // Check secondary products
    await expect(page.getByText('Smart Watch')).toBeVisible();
    await expect(page.getByText('$149')).toBeVisible();
    await expect(page.getByText('Wireless Earbuds')).toBeVisible();
    await expect(page.getByText('$79')).toBeVisible();
  });

  test('should display urgency banner', async ({ page }) => {
    // Check urgency message
    await expect(page.getByText('⏰ Sale ends in 24 hours! Order now!')).toBeVisible();
  });

  test('should have proper image loading', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Check product images are loaded
    const productImages = page.locator('img[alt*="Headphones"], img[alt*="Watch"], img[alt*="Earbuds"]');
    const imageCount = await productImages.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Check first image is loaded
    if (imageCount > 0) {
      await expect(productImages.first()).toBeVisible();
    }
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view (default)
    await expect(page.getByText('Premium')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText('Premium')).toBeVisible();
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('Premium')).toBeVisible();
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible();
  });

  test('should handle button interactions', async ({ page }) => {
    const shopNowButton = page.getByRole('link', { name: /🛒 SHOP NOW - Save Big!/i });
    
    // Test hover effect (check if hover classes are applied)
    await shopNowButton.hover();
    await page.waitForTimeout(500); // Wait for hover animation
    
    // Test click (should navigate)
    await shopNowButton.click();
    await expect(page).toHaveURL(/\/products/);
  });

  test('should display trust badges', async ({ page }) => {
    // Check trust indicators at bottom
    await expect(page.getByText('Secure Payment')).toBeVisible();
    await expect(page.getByText('Premium Quality')).toBeVisible();
  });

  test('should have proper color scheme', async ({ page }) => {
    // Check background color
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveClass(/bg-sg-navy/);
    
    // Check text colors
    await expect(page.getByText('Premium')).toHaveClass(/text-white/);
    await expect(page.getByText('Tech Store')).toHaveClass(/text-sg-aqua/);
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should have no console errors
    expect(errors.length).toBe(0);
  });
});
