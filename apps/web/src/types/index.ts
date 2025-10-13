export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ADMIN' | 'MANAGER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  trackQuantity: boolean;
  continueSellingWhenOutOfStock: boolean;
  requiresShipping: boolean;
  isPhysical: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  brandId?: string;
  supplierId?: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  brand?: Brand;
  variants: ProductVariant[];
  media: ProductMedia[];
  inventory?: InventoryLevel[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  weight?: number;
  barcode?: string;
  trackQuantity: boolean;
  continueSellingWhenOutOfStock: boolean;
  requiresShipping: boolean;
  isActive: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  attributes: VariantAttribute[];
  inventory?: InventoryLevel[];
}

export interface VariantAttribute {
  id: string;
  variantId: string;
  name: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
  parent?: Category;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductMedia {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  type: 'IMAGE' | 'VIDEO';
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant: ProductVariant & { product: Product };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  phone?: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  fulfillmentStatus: 'PENDING' | 'FULFILLED' | 'PARTIALLY_FULFILLED' | 'CANCELLED';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  notes?: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant: ProductVariant & { product: Product };
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface InventoryLevel {
  id: string;
  variantId: string;
  warehouseId: string;
  onHand: number;
  available: number;
  committed: number;
  reserved: number;
  onOrder: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
  variant: ProductVariant;
  warehouse: Warehouse;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: Address;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  variantId: string;
  warehouseId: string;
  type: 'ADJUSTMENT' | 'SALE' | 'PURCHASE' | 'TRANSFER' | 'RETURN' | 'DAMAGE' | 'RESERVATION' | 'UNRESERVATION';
  quantity: number;
  reason?: string;
  referenceId?: string;
  referenceType?: string;
  createdAt: string;
  variant: ProductVariant;
  warehouse: Warehouse;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  provider: 'stripe' | 'paypal' | 'mobile_money';
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId: string;
  status: string;
  error?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutForm {
  email: string;
  phone?: string;
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  paymentMethod: string;
}

// Store types
export interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// Search types
export interface SearchFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  products: Product[];
  filters: {
    categories: Array<{ id: string; name: string; count: number }>;
    brands: Array<{ id: string; name: string; count: number }>;
    priceRange: { min: number; max: number };
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
