export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  status: 'draft' | 'active' | 'out_of_stock' | 'archived';
  createdAt: string;
  updatedAt: string
  productProperties: ProductProperty[];
  productPricing: ProductPricing;
  productImages: ProductImage[];
  category: Category;
  orderItems: OrderItem[];
}

export interface ProductProperty {
  id: string;
  productId: string;
  name: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'color' | 'size';
}

export interface ProductPricing {
  id: string;
  productId: string;
  basePrice: number;
  compareAtPrice?: number;
  costPrice: number;
  currency: string;
  taxIncluded: boolean;
  discounts?: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface SidebarNavItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  totalCategories: number;
  recentOrders: Order[];
  topProducts: Array<{
    productId: string;
    productName: string;
    ordersCount: number;
    revenue: number;
  }>;
}

