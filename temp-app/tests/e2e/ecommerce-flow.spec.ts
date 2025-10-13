import { test, expect } from '@playwright/test';

test.describe('E-Commerce User Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete shopping flow - browse to purchase', async ({ page }) => {
    // Step 1: Browse products from homepage
    await page.getByRole('link', { name: /shop now/i }).click();
    await expect(page).toHaveURL(/\/products/);
    
    // Step 2: Select a product (assuming products page exists)
    // This is a placeholder - adjust based on your actual product page structure
    const firstProduct = page.locator('[data-testid="product-item"]').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      // Step 3: Add to cart
      const addToCartButton = page.getByRole('button', { name: /add to cart/i });
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
        
        // Verify cart notification or update
        await expect(page.getByText(/added to cart/i)).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('category navigation flow', async ({ page }) => {
    // Step 1: Click on a category from homepage
    await page.getByText('Electronics').click();
    
    // Should navigate to category page or filter products
    // Adjust expectations based on your routing
    await page.waitForLoadState('networkidle');
    
    // Verify category content is displayed
    await expect(page.getByText('Electronics')).toBeVisible();
  });

  test('search functionality', async ({ page }) => {
    // Look for search input (adjust selector based on your implementation)
    const searchInput = page.getByPlaceholder(/search/i);
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('headphones');
      await searchInput.press('Enter');
      
      // Wait for search results
      await page.waitForLoadState('networkidle');
      
      // Verify search results contain the search term
      await expect(page.getByText(/headphones/i)).toBeVisible();
    }
  });

  test('product filtering and sorting', async ({ page }) => {
    // Navigate to products page
    await page.getByRole('link', { name: /browse categories/i }).click();
    
    // Look for filter options (adjust based on your implementation)
    const priceFilter = page.getByText(/price/i);
    const sortOption = page.getByText(/sort/i);
    
    if (await priceFilter.isVisible()) {
      await priceFilter.click();
      await page.waitForLoadState('networkidle');
    }
    
    if (await sortOption.isVisible()) {
      await sortOption.click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('cart management', async ({ page }) => {
    // This test assumes you have cart functionality
    // Navigate to cart page or open cart modal
    const cartButton = page.getByRole('button', { name: /cart/i });
    
    if (await cartButton.isVisible()) {
      await cartButton.click();
      
      // Verify cart interface
      await expect(page.getByText(/cart/i)).toBeVisible();
      
      // Test quantity updates (if applicable)
      const quantityInput = page.locator('input[type="number"]').first();
      if (await quantityInput.isVisible()) {
        await quantityInput.fill('2');
        await page.waitForTimeout(1000); // Wait for update
      }
      
      // Test remove item (if applicable)
      const removeButton = page.getByRole('button', { name: /remove/i }).first();
      if (await removeButton.isVisible()) {
        await removeButton.click();
      }
    }
  });

  test('checkout process', async ({ page }) => {
    // This test assumes you have checkout functionality
    // Navigate to checkout (adjust based on your implementation)
    const checkoutButton = page.getByRole('button', { name: /checkout/i });
    
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      
      // Fill checkout form (adjust fields based on your form)
      const emailInput = page.getByLabel(/email/i);
      const nameInput = page.getByLabel(/name/i);
      const addressInput = page.getByLabel(/address/i);
      
      if (await emailInput.isVisible()) {
        await emailInput.fill('test@example.com');
      }
      
      if (await nameInput.isVisible()) {
        await nameInput.fill('John Doe');
      }
      
      if (await addressInput.isVisible()) {
        await addressInput.fill('123 Test Street');
      }
      
      // Submit checkout (don't actually process payment in tests)
      const submitButton = page.getByRole('button', { name: /place order/i });
      if (await submitButton.isVisible()) {
        // Just verify the button is clickable, don't actually submit
        await expect(submitButton).toBeEnabled();
      }
    }
  });

  test('user account features', async ({ page }) => {
    // Test login/register functionality (if available)
    const loginButton = page.getByRole('link', { name: /login|sign in/i });
    
    if (await loginButton.isVisible()) {
      await loginButton.click();
      
      // Verify login form
      await expect(page.getByLabel(/email|username/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
      
      // Test form validation (enter invalid data)
      await page.getByLabel(/email|username/i).fill('invalid-email');
      await page.getByRole('button', { name: /login|sign in/i }).click();
      
      // Should show validation error
      await expect(page.getByText(/invalid|error/i)).toBeVisible({ timeout: 3000 });
    }
  });

  test('wishlist functionality', async ({ page }) => {
    // Test wishlist/favorites (if available)
    const wishlistButton = page.getByRole('button', { name: /wishlist|favorite/i }).first();
    
    if (await wishlistButton.isVisible()) {
      await wishlistButton.click();
      
      // Verify wishlist update
      await page.waitForTimeout(1000);
      
      // Navigate to wishlist page (if exists)
      const wishlistLink = page.getByRole('link', { name: /wishlist/i });
      if (await wishlistLink.isVisible()) {
        await wishlistLink.click();
        await expect(page.getByText(/wishlist/i)).toBeVisible();
      }
    }
  });

  test('mobile responsive shopping experience', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test mobile navigation
    const mobileMenu = page.getByRole('button', { name: /menu|hamburger/i });
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
    
    // Test mobile product browsing
    await page.getByRole('link', { name: /shop now/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Verify mobile layout works
    await expect(page.getByText(/products/i)).toBeVisible();
  });

  test('performance and loading times', async ({ page }) => {
    // Test page load performance
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within reasonable time
    expect(loadTime).toBeLessThan(10000); // 10 seconds max
    
    // Test navigation performance
    const navStart = Date.now();
    await page.getByRole('link', { name: /browse categories/i }).click();
    await page.waitForLoadState('networkidle');
    const navTime = Date.now() - navStart;
    
    expect(navTime).toBeLessThan(5000); // 5 seconds max for navigation
  });
});
