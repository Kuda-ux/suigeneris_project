# 🧪 Testing Guide for Sui Generis E-Commerce

This comprehensive testing guide covers all aspects of automated testing for the Sui Generis e-commerce platform.

## 🚀 Quick Start

### Prerequisites
1. Ensure your development server is running:
   ```bash
   npm run dev
   ```

2. Install Playwright browsers:
   ```bash
   npm run test:install
   ```

### Run All Tests
```bash
npm test
```

## 📋 Test Categories

### 🌐 End-to-End (E2E) Tests
Tests complete user workflows and critical business processes.

```bash
# Run all E2E tests
npm run test:e2e

# Run specific E2E test files
npx playwright test tests/e2e/homepage.spec.ts
npx playwright test tests/e2e/admin-dashboard.spec.ts
npx playwright test tests/e2e/ecommerce-flow.spec.ts
```

**Coverage:**
- ✅ Homepage functionality
- ✅ Admin dashboard navigation
- ✅ Shopping cart workflows
- ✅ Product browsing and filtering
- ✅ User authentication flows
- ✅ Mobile responsive behavior

### 🔌 API Tests
Validates backend API endpoints and data integrity.

```bash
# Run API tests
npm run test:api
```

**Coverage:**
- ✅ Admin role management
- ✅ User management endpoints
- ✅ Reports generation
- ✅ Alert system APIs
- ✅ Response time validation
- ✅ Error handling

### 🎨 Component Tests
Tests individual UI components in isolation.

```bash
# Run component tests
npm run test:component
```

**Coverage:**
- ✅ Hero section rendering
- ✅ Product cards display
- ✅ Button interactions
- ✅ Form validations
- ✅ Responsive design

### ♿ Accessibility Tests
Ensures WCAG compliance and inclusive design.

```bash
# Run accessibility tests
npm run test:accessibility
```

**Coverage:**
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Color contrast ratios
- ✅ Screen reader compatibility
- ✅ Focus management

### ⚡ Performance Tests
Monitors page load times and Core Web Vitals.

```bash
# Run performance tests
npm run test:performance
```

**Coverage:**
- ✅ Page load times
- ✅ Core Web Vitals (LCP, CLS, FID)
- ✅ Resource optimization
- ✅ API response times
- ✅ Concurrent user handling

### 👁️ Visual Regression Tests
Detects unintended visual changes.

```bash
# Run visual tests
npm run test:visual
```

**Coverage:**
- ✅ Homepage screenshots
- ✅ Admin dashboard views
- ✅ Mobile/tablet layouts
- ✅ Component styling
- ✅ Hover states

## 🌍 Cross-Browser Testing

### Test on Different Browsers
```bash
# Chrome (default)
npm test

# Firefox
npm run test:firefox

# Safari (WebKit)
npm run test:webkit

# Mobile Chrome
npm run test:mobile
```

### Test on All Browsers
```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

## 🔧 Test Development

### Running Tests in Development Mode

```bash
# Run tests with browser visible
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Debug specific test
npm run test:debug
```

### Writing New Tests

1. **Create test file** in appropriate directory:
   ```
   tests/
   ├── e2e/           # End-to-end tests
   ├── api/           # API tests
   ├── component/     # Component tests
   ├── accessibility/ # A11y tests
   ├── performance/   # Performance tests
   └── visual/        # Visual regression tests
   ```

2. **Use test helpers** for common patterns:
   ```typescript
   import { TestHelpers } from '../utils/test-helpers';
   
   test('my test', async ({ page }) => {
     const helpers = new TestHelpers(page);
     await helpers.navigateAndWait('/');
     await helpers.addProductToCart('[data-testid="product-1"]');
   });
   ```

3. **Follow naming conventions**:
   - File: `feature-name.spec.ts`
   - Test: `should do something when condition`

## 📊 Test Reports

### View Test Results
```bash
# Open HTML report
npm run test:report

# View in browser after test run
npx playwright show-report
```

### Test Artifacts
- **Screenshots**: `test-results/screenshots/`
- **Videos**: `test-results/videos/`
- **Traces**: `test-results/traces/`
- **Reports**: `test-results/html-report/`

## 🎯 Test Data Management

### Mock Data Generators
```typescript
import { MockDataGenerator } from '../utils/test-helpers';

const testUser = MockDataGenerator.generateUser();
const testProduct = MockDataGenerator.generateProduct();
```

### API Mocking
```typescript
// Mock API responses
await page.route('/api/products', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify(mockProducts)
  });
});
```

## 🚨 Debugging Failed Tests

### 1. Check Screenshots
Failed tests automatically capture screenshots in `test-results/`

### 2. View Video Recordings
```bash
# Videos are saved for failed tests
ls test-results/videos/
```

### 3. Inspect Traces
```bash
# Open trace viewer
npx playwright show-trace test-results/traces/trace.zip
```

### 4. Debug Interactively
```bash
# Run single test in debug mode
npx playwright test --debug tests/e2e/homepage.spec.ts
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: test-results/
```

## 📈 Test Metrics

### Coverage Goals
- **E2E Coverage**: 80% of critical user journeys
- **API Coverage**: 100% of endpoints
- **Component Coverage**: 90% of UI components
- **Accessibility**: 100% WCAG AA compliance
- **Performance**: All pages < 3s load time

### Quality Gates
- ✅ All tests must pass
- ✅ No accessibility violations
- ✅ Performance budgets met
- ✅ Visual regressions reviewed

## 🛠️ Troubleshooting

### Common Issues

1. **Tests timing out**
   ```bash
   # Increase timeout in playwright.config.ts
   timeout: 30000
   ```

2. **Flaky tests**
   ```bash
   # Add retry logic
   retries: 2
   ```

3. **Browser not found**
   ```bash
   # Reinstall browsers
   npm run test:install
   ```

4. **Port conflicts**
   ```bash
   # Change port in playwright.config.ts
   baseURL: 'http://localhost:3001'
   ```

## 📚 Best Practices

### Test Writing
- ✅ Use data-testid attributes for stable selectors
- ✅ Write descriptive test names
- ✅ Keep tests independent and isolated
- ✅ Use page object model for complex flows
- ✅ Mock external dependencies

### Performance
- ✅ Run tests in parallel when possible
- ✅ Use headless mode for CI
- ✅ Clean up test data after each test
- ✅ Optimize test selectors

### Maintenance
- ✅ Review and update tests regularly
- ✅ Remove obsolete tests
- ✅ Keep test helpers up to date
- ✅ Monitor test execution times

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [Visual Comparisons](https://playwright.dev/docs/test-screenshots)

---

## 🚀 Ready to Test!

Your comprehensive testing framework is now set up. Start with:

```bash
# Install browsers
npm run test:install

# Run a quick smoke test
npm run test:e2e

# View the results
npm run test:report
```

Happy testing! 🎉
