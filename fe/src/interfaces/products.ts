export default interface IProduct {
  _id: string;
  name: string;
  price: number;
  slug: string;
  images: string[]; // Mảng các đường dẫn ảnh
  thumbnail: string; // Đường dẫn ảnh chính
  brand?: string;
  quantity?: number;
  description?: string;
  categoryId: {
    _id: string;
    categoryName: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type ProductInput = Omit<IProduct, "_id">;

export interface CartItem {
  productId: IProduct;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
}
