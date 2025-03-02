interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    categoryId: string,
    thumbnail: string,
    rating: number
    brand: string
}

export default IProduct;

export type ProductInput = Omit<IProduct,'_id'|'stock'|'rating'>;