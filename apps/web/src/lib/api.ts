const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Products endpoints
  async getProducts(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/products${query}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts() {
    return this.request('/products/featured');
  }

  async getProductsByCategory(categoryId: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/products/category/${categoryId}${query}`);
  }

  // Cart endpoints
  async getCart(sessionId?: string) {
    const query = sessionId ? `?sessionId=${sessionId}` : '';
    return this.request(`/cart${query}`);
  }

  async addToCart(variantId: string, quantity: number, sessionId?: string) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity, sessionId }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeCartItem(itemId: string) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Orders endpoints
  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/orders${query}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  // Payments endpoints
  async createPaymentIntent(orderId: string, provider: string) {
    return this.request('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ orderId, provider }),
    });
  }

  async confirmPayment(paymentIntentId: string, provider: string) {
    return this.request('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, provider }),
    });
  }

  // Inventory endpoints
  async getInventory(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/inventory${query}`);
  }

  async getStockLevels(variantIds: string[]) {
    return this.request('/inventory/stock-levels', {
      method: 'POST',
      body: JSON.stringify({ variantIds }),
    });
  }

  // Media endpoints
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/media/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    return this.request('/media/upload-multiple', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
