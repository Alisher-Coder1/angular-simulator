import { IProduct } from './product.interface';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  id: number | null;
  userId: number | null;
  items: ICartItem[];
}

export interface ICartApiProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface ICartApiResponse {
  id: number;
  products: ICartApiProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface IUserCartsResponse {
  carts: ICartApiResponse[];
  total: number;
  skip: number;
  limit: number;
}
