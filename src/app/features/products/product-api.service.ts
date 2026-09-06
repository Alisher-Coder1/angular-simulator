import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProductResponse } from './interfaces/product-response.interface';
import { IProduct } from './interfaces/product.interface';

export type ProductSortField = 'title' | 'price' | 'rating' | 'stock';
export type ProductSortOrder = 'asc' | 'desc';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://dummyjson.com/products';

  getProducts(
    limit: number,
    skip: number,
    sortBy: ProductSortField = 'title',
    order: ProductSortOrder = 'asc',
  ): Observable<IProductResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<IProductResponse>(this.apiUrl, { params });
  }

  searchProducts(
    query: string,
    limit: number,
    skip: number,
    sortBy: ProductSortField = 'title',
    order: ProductSortOrder = 'asc',
  ): Observable<IProductResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit)
      .set('skip', skip)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<IProductResponse>(`${this.apiUrl}/search`, {
      params,
    });
  }

  getProductsByCategory(
    category: string,
    limit: number,
    skip: number,
    sortBy: ProductSortField = 'title',
    order: ProductSortOrder = 'asc',
  ): Observable<IProductResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<IProductResponse>(
      `${this.apiUrl}/category/${category}`,
      { params },
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/category-list`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }
}
