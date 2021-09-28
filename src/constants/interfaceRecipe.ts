export interface Ingredient {
  name: string;
  quantity: number;
  [key: string]: string | number;
}

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: Ingredient[];
}
