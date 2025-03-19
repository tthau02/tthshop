export interface ICategory {
  _id: string;
  categoryName: string;
  desc: string;
  image?: string | FileList;
}

export type CategoryInput = Omit<ICategory, "_id">;
