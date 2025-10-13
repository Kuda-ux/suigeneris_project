import { test, expect } from '@playwright/test';

test.describe('Admin API Endpoints', () => {
  const baseURL = 'http://localhost:3000';

  test('should fetch roles successfully', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/roles`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('roles');
    expect(Array.isArray(data.roles)).toBe(true);
    expect(data.roles.length).toBeGreaterThan(0);
    
    // Check role structure
    const role = data.roles[0];
    expect(role).toHaveProperty('id');
    expect(role).toHaveProperty('name');
    expect(role).toHaveProperty('permissions');
  });

  test('should create new role', async ({ request }) => {
    const newRole = {
      name: 'Test Manager',
      permissions: ['read', 'write']
    };

    const response = await request.post(`${baseURL}/api/admin/roles`, {
      data: newRole
    });
    
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('role');
    expect(data.role.name).toBe(newRole.name);
    expect(data.role.permissions).toEqual(newRole.permissions);
  });

  test('should fetch users successfully', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/users`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('users');
    expect(Array.isArray(data.users)).toBe(true);
    expect(data.users.length).toBeGreaterThan(0);
    
    // Check user structure
    const user = data.users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
  });

  test('should fetch alerts successfully', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/alerts`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('alerts');
    expect(Array.isArray(data.alerts)).toBe(true);
    
    // Check alert structure if alerts exist
    if (data.alerts.length > 0) {
      const alert = data.alerts[0];
      expect(alert).toHaveProperty('id');
      expect(alert).toHaveProperty('type');
      expect(alert).toHaveProperty('message');
      expect(alert).toHaveProperty('timestamp');
    }
  });

  test('should fetch reports successfully', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/reports`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('reports');
    expect(Array.isArray(data.reports)).toBe(true);
    expect(data.reports.length).toBeGreaterThan(0);
    
    // Check report structure
    const report = data.reports[0];
    expect(report).toHaveProperty('id');
    expect(report).toHaveProperty('name');
    expect(report).toHaveProperty('type');
  });

  test('should fetch stock movement summary', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/reports/stock-movement-summary`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('summary');
    expect(data.summary).toHaveProperty('totalMovements');
    expect(data.summary).toHaveProperty('inbound');
    expect(data.summary).toHaveProperty('outbound');
    expect(data.summary).toHaveProperty('adjustments');
  });

  test('should fetch top selling products', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/reports/top-selling`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('products');
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThan(0);
    
    // Check product structure
    const product = data.products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('sold');
    expect(product).toHaveProperty('revenue');
  });

  test('should fetch dead stock report', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/admin/reports/dead-stock`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('deadStock');
    expect(Array.isArray(data.deadStock)).toBe(true);
    
    // Check dead stock structure if items exist
    if (data.deadStock.length > 0) {
      const item = data.deadStock[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('lastSold');
      expect(item).toHaveProperty('stock');
    }
  });

  test('should handle API errors gracefully', async ({ request }) => {
    // Test non-existent endpoint
    const response = await request.get(`${baseURL}/api/admin/nonexistent`);
    
    expect(response.status()).toBe(404);
  });

  test('should validate API response times', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(`${baseURL}/api/admin/users`);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
  });
});
