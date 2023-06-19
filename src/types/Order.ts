export enum OrderStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface Product {
  _id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: Product[];
  rating?: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
