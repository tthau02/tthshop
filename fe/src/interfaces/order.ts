export interface User {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
}

export interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  _id: string;
  userId: User | null;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  shippingAddress: ShippingAddress;
}

export interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  limit: number;
}
