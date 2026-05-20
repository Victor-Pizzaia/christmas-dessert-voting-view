export interface DessertOwner {
  id: number;
  name: string;
}

export interface Dessert {
  id: number;
  name: string;
  description?: string;
  owner?: DessertOwner;
  subscribed?: boolean;
}

export interface CreateDessertRequest {
  name: string;
  description?: string;
}
