import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import {
  IAuth,
  ILoginRequest,
  IRefreshTokenResponse,
} from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://dummyjson.com/auth';

  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';
  private readonly userKey = 'authUser';

  private readonly currentUserSubject = new BehaviorSubject<IAuth | null>(
    this.getStoredUser(),
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: ILoginRequest): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((user) => {
          this.saveAuthData(user);
          this.currentUserSubject.next(user);
        }),
      );
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this.http
      .post<IRefreshTokenResponse>(`${this.apiUrl}/refresh`, {
        refreshToken: this.getRefreshToken(),
        expiresInMins: 30,
      })
      .pipe(
        tap((tokens) => {
          localStorage.setItem(this.accessTokenKey, tokens.accessToken);
          localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);

    this.currentUserSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();

    if (!accessToken || this.isTokenExpired(accessToken)) {
      this.logout();
      return false;
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const tokenParts = token.split('.');

      if (tokenParts.length !== 3) {
        return true;
      }

      const payload = tokenParts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const paddedPayload = payload.padEnd(
        Math.ceil(payload.length / 4) * 4,
        '=',
      );

      const decodedPayload = JSON.parse(
        atob(paddedPayload),
      ) as { exp?: number };

      if (typeof decodedPayload.exp !== 'number') {
        return true;
      }

      return decodedPayload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  private saveAuthData(user: IAuth): void {
    localStorage.setItem(this.accessTokenKey, user.accessToken);
    localStorage.setItem(this.refreshTokenKey, user.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getStoredUser(): IAuth | null {
    const storedUser = localStorage.getItem(this.userKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as IAuth;
    } catch {
      return null;
    }
  }
}