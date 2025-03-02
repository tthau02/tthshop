interface IProduct {
    _id: string,
    title: string,
    name: string,
    price: number,
    description: string,
    category: string,
    thumbnail: string,
    rating: number
    brand: string
}

export default IProduct;

export type ProductInput = Omit<IProduct,'_id'|'stock'|'rating'>;