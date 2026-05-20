export interface Dessert {
  id: string;
  name: string;
  description?: string;
  recipe?: string;
}

export interface CreateDessertRequest {
  name: string;
  description?: string;
  recipe?: string;
}
