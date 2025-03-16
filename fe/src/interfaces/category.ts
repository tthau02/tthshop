export interface ICategory {
    _id: string,
    categoryName: string,
    desc: string
}

export type CategoryInput = Omit<ICategory,'_id'>;