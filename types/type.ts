export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface NotificationType {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

// Backend API response types
export type SellerResponse = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  products: string[];
  termsnCondition: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type ProductResponse = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  quantity: number;
  category: string;
  seller: SellerResponse | string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
