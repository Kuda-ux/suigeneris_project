import { Page, expect } from '@playwright/test';

/**
 * Test helper utilities for common e-commerce testing patterns
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to be fully loaded including images and network requests
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to a page and wait for it to load
   */
  async navigateAndWait(url: string) {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Check if an element is visible with retry logic
   */
  async isElementVisible(selector: string, timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout, state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill form fields safely
   */
  async fillForm(fields: Record<string, string>) {
    for (const [selector, value] of Object.entries(fields)) {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible' });
      await element.fill(value);
    }
  }

  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for API response
   */
  async waitForApiResponse(urlPattern: string | RegExp, timeout = 10000) {
    return await this.page.waitForResponse(
      response => {
        const url = response.url();
        if (typeof urlPattern === 'string') {
          return url.includes(urlPattern);
        }
        return urlPattern.test(url);
      },
      { timeout }
    );
  }

  /**
   * Check for console errors
   */
  async checkConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Simulate mobile device
   */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  /**
   * Simulate tablet device
   */
  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  /**
   * Simulate desktop device
   */
  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * Add product to cart (e-commerce specific)
   */
  async addProductToCart(productSelector: string) {
    const product = this.page.locator(productSelector);
    await product.waitFor({ state: 'visible' });
    
    const addToCartButton = product.locator('button', { hasText: /add to cart/i });
    await addToCartButton.click();
    
    // Wait for cart update notification
    await this.page.waitForSelector('[data-testid="cart-notification"], .cart-notification', 
      { timeout: 5000, state: 'visible' }
    ).catch(() => {
      // Ignore if no notification appears
    });
  }

  /**
   * Navigate through admin dashboard tabs
   */
  async navigateAdminTab(tabName: string) {
    const tab = this.page.getByText(tabName, { exact: true });
    await tab.click();
    await this.waitForPageLoad();
  }

  /**
   * Login to admin dashboard (if login is required)
   */
  async adminLogin(email = 'admin@test.com', password = 'password') {
    const emailField = this.page.getByLabel(/email/i);
    const passwordField = this.page.getByLabel(/password/i);
    const loginButton = this.page.getByRole('button', { name: /login|sign in/i });

    if (await emailField.isVisible()) {
      await emailField.fill(email);
      await passwordField.fill(password);
      await loginButton.click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Check if page has proper SEO elements
   */
  async checkSEOElements() {
    const title = await this.page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);

    const metaDescription = await this.page.locator('meta[name="description"]').getAttribute('content');
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(50);
      expect(metaDescription.length).toBeLessThan(160);
    }
  }

  /**
   * Test responsive design at different breakpoints
   */
  async testResponsiveBreakpoints() {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const breakpoint of breakpoints) {
      await this.page.setViewportSize({ 
        width: breakpoint.width, 
        height: breakpoint.height 
      });
      
      await this.page.waitForTimeout(500); // Wait for responsive changes
      
      // Check that main content is still visible
      await expect(this.page.locator('main, [role="main"]')).toBeVisible();
    }
  }

  /**
   * Measure page performance metrics
   */
  async measurePerformance() {
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    });

    return metrics;
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    // Focus first interactive element
    await this.page.keyboard.press('Tab');
    
    let focusedElement = await this.page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);

    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(100);
    }

    // Should still have a focused element
    focusedElement = await this.page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  }

  /**
   * Verify all images have loaded successfully
   */
  async verifyImagesLoaded() {
    const images = this.page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const src = await img.getAttribute('src');
      
      if (src && !src.startsWith('data:')) {
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  }

  /**
   * Test form validation
   */
  async testFormValidation(formSelector: string, requiredFields: string[]) {
    const form = this.page.locator(formSelector);
    await form.waitFor({ state: 'visible' });

    // Try to submit empty form
    const submitButton = form.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();

    // Check for validation messages
    for (const field of requiredFields) {
      const fieldElement = form.locator(field);
      const validationMessage = await fieldElement.evaluate((el: HTMLInputElement) => el.validationMessage);
      expect(validationMessage).toBeTruthy();
    }
  }
}

/**
 * Mock data generators for testing
 */
export class MockDataGenerator {
  static generateUser() {
    return {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'TestPassword123!',
      phone: '+1234567890',
      address: '123 Test Street, Test City, TC 12345'
    };
  }

  static generateProduct() {
    return {
      name: `Test Product ${Date.now()}`,
      price: Math.floor(Math.random() * 1000) + 10,
      description: 'This is a test product for automated testing',
      category: 'Electronics',
      stock: Math.floor(Math.random() * 100) + 1
    };
  }

  static generateOrder() {
    return {
      id: `ORDER-${Date.now()}`,
      total: Math.floor(Math.random() * 500) + 50,
      status: 'pending',
      items: [
        {
          productId: 1,
          quantity: 2,
          price: 99.99
        }
      ]
    };
  }
}

/**
 * API testing utilities
 */
export class APITestHelpers {
  static async makeRequest(page: Page, method: string, url: string, data?: any) {
    const methodLower = method.toLowerCase();
    let response;
    
    if (methodLower === 'get') {
      response = await page.request.get(url);
    } else if (methodLower === 'post') {
      response = await page.request.post(url, {
        data: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (methodLower === 'put') {
      response = await page.request.put(url, {
        data: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (methodLower === 'delete') {
      response = await page.request.delete(url);
    } else {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return {
      status: response.status(),
      data: await response.json().catch(() => null),
      headers: response.headers()
    };
  }

  static validateAPIResponse(response: any, expectedStatus: number) {
    expect(response.status).toBe(expectedStatus);
    
    if (response.status >= 200 && response.status < 300) {
      expect(response.data).toBeTruthy();
    }
  }
}
