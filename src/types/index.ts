export type User = {
  id: string;

  username: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;

  slug: string;
  name: string;
  imageURL: string;
  price: number;
  description: string;
  sku: string;

  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;

  userId: string | null;
  status: string;

  items: OrderItem[];

  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;

  quantity: number;
  productId: string;
  orderId: string;

  createdAt: Date;
  updatedAt: Date;
};
