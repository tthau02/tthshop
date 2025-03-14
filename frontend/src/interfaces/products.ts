interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    categoryId: string,
    thumbnail: string,
    quantity: number
    brand: string
}

export default IProduct;

export type ProductInput = Omit<IProduct,'_id'>;


export interface CartItem {
    productId: IProduct;
    quantity: number;
  }
  
  export interface Cart {
    userId: string;
    items: CartItem[];
    totalAmount: number;
  }