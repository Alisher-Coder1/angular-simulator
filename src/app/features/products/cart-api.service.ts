import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ICartApiProduct,
  ICartApiResponse,
  IUserCartsResponse,
} from './interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://dummyjson.com/carts';

  getUserCart(userId: number): Observable<IUserCartsResponse> {
    return this.http.get<IUserCartsResponse>(`${this.apiUrl}/user/${userId}`);
  }

  createCart(
    userId: number,
    products: ICartApiProduct[],
  ): Observable<ICartApiResponse> {
    return this.http.post<ICartApiResponse>(`${this.apiUrl}/add`, {
      userId,
      products,
    });
  }

  updateCart(
    cartId: number,
    products: ICartApiProduct[],
  ): Observable<ICartApiResponse> {
    return this.http.put<ICartApiResponse>(`${this.apiUrl}/${cartId}`, {
      merge: true,
      products,
    });
  }

  deleteCart(cartId: number): Observable<ICartApiResponse> {
    return this.http.delete<ICartApiResponse>(`${this.apiUrl}/${cartId}`);
  }
}
