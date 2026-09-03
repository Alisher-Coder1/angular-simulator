import { IProduct } from './product.interface';

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
