import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('admin dashboard should be accessible', async ({ page }) => {
    await page.goto('/admin');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one h1
    
    // Check h1 content
    await expect(page.locator('h1')).toContainText(/Premium.*Tech Store/i);
  });

  test('should have alt text for all images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(0);
    }
  });

  test('should have proper form labels', async ({ page }) => {
    // Test any forms that exist (login, contact, etc.)
    await page.goto('/');
    
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        // Check if there's a label for this input
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        
        // Input should have either a label, aria-label, or aria-labelledby
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation through interactive elements
    const focusableElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const elementCount = await focusableElements.count();
    
    if (elementCount > 0) {
      // Focus first element
      await focusableElements.first().focus();
      
      // Tab through a few elements
      for (let i = 0; i < Math.min(5, elementCount); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }
      
      // Should be able to navigate with keyboard
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Use axe-core to check color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });

  test('should support screen readers', async ({ page }) => {
    await page.goto('/');
    
    // Check for ARIA landmarks
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Check for skip links (if implemented)
    const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
  });

  test('should handle focus management', async ({ page }) => {
    await page.goto('/');
    
    // Test modal focus management (if modals exist)
    const modalTrigger = page.getByRole('button', { name: /open|modal|dialog/i }).first();
    
    if (await modalTrigger.count() > 0) {
      await modalTrigger.click();
      
      // Focus should be trapped in modal
      const modal = page.locator('[role="dialog"], .modal').first();
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Close modal with Escape key
        await page.keyboard.press('Escape');
        await expect(modal).not.toBeVisible();
      }
    }
  });
});
