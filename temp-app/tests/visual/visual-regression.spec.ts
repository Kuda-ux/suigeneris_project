import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      threshold: 0.2, // Allow 20% difference for dynamic content
    });
  });

  test('hero section visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot just the hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveScreenshot('hero-section.png', {
      threshold: 0.1,
    });
  });

  test('categories section visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to categories section
    await page.getByText('Shop by Category').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const categoriesSection = page.locator('section').filter({ hasText: 'Shop by Category' });
    await expect(categoriesSection).toHaveScreenshot('categories-section.png', {
      threshold: 0.15,
    });
  });

  test('admin dashboard visual regression', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Screenshot admin dashboard
    await expect(page).toHaveScreenshot('admin-dashboard.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('admin reports section visual regression', async ({ page }) => {
    await page.goto('/admin');
    await page.getByText('Reports').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Screenshot reports section
    const reportsSection = page.locator('[data-testid="reports-section"]').first();
    if (await reportsSection.count() > 0) {
      await expect(reportsSection).toHaveScreenshot('admin-reports.png', {
        threshold: 0.15,
      });
    } else {
      // Fallback to full page if no specific reports section
      await expect(page).toHaveScreenshot('admin-reports-full.png', {
        threshold: 0.2,
      });
    }
  });

  test('mobile homepage visual regression', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('tablet homepage visual regression', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('tablet-homepage.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('product cards visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find product cards
    const productCard = page.locator('[data-testid="product-card"]').first();
    if (await productCard.count() > 0) {
      await expect(productCard).toHaveScreenshot('product-card.png', {
        threshold: 0.1,
      });
    }
  });

  test('buttons and interactive elements visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot CTA buttons
    const shopNowButton = page.getByRole('link', { name: /shop now/i });
    await expect(shopNowButton).toHaveScreenshot('shop-now-button.png', {
      threshold: 0.05,
    });
    
    const browseCategoriesButton = page.getByRole('link', { name: /browse categories/i });
    await expect(browseCategoriesButton).toHaveScreenshot('browse-categories-button.png', {
      threshold: 0.05,
    });
  });

  test('hover states visual regression', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test button hover state
    const shopNowButton = page.getByRole('link', { name: /shop now/i });
    await shopNowButton.hover();
    await page.waitForTimeout(500); // Wait for hover animation
    
    await expect(shopNowButton).toHaveScreenshot('shop-now-button-hover.png', {
      threshold: 0.1,
    });
  });

  test('dark mode visual regression (if supported)', async ({ page }) => {
    // Check if dark mode is supported
    await page.goto('/');
    
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    if (await darkModeToggle.count() > 0) {
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: true,
        threshold: 0.2,
      });
    }
  });

  test('error states visual regression', async ({ page }) => {
    // Test 404 page if it exists
    await page.goto('/non-existent-page');
    
    // Check if custom 404 page exists
    const notFoundText = page.getByText(/404|not found|page not found/i);
    if (await notFoundText.count() > 0) {
      await expect(page).toHaveScreenshot('404-page.png', {
        threshold: 0.1,
      });
    }
  });

  test('loading states visual regression', async ({ page }) => {
    // Intercept API calls to simulate loading
    await page.route('/api/**', route => {
      // Delay response to capture loading state
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.goto('/admin');
    
    // Try to capture loading state
    await page.waitForTimeout(500);
    
    const loadingIndicator = page.locator('[data-testid="loading"], .loading, .spinner');
    if (await loadingIndicator.count() > 0) {
      await expect(loadingIndicator.first()).toHaveScreenshot('loading-state.png', {
        threshold: 0.1,
      });
    }
  });

  test('form elements visual regression', async ({ page }) => {
    await page.goto('/');
    
    // Look for any forms
    const formInputs = page.locator('input, textarea, select');
    const inputCount = await formInputs.count();
    
    if (inputCount > 0) {
      // Screenshot first form element
      await expect(formInputs.first()).toHaveScreenshot('form-input.png', {
        threshold: 0.05,
      });
      
      // Test focus state
      await formInputs.first().focus();
      await expect(formInputs.first()).toHaveScreenshot('form-input-focus.png', {
        threshold: 0.1,
      });
    }
  });
});
