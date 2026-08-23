import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthRequest =
    req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  const accessToken = authService.getAccessToken();

  const request =
    accessToken && !isAuthRequest
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        isAuthRequest
      ) {
        return throwError(() => error);
      }

      const refreshToken = authService.getRefreshToken();

      if (!refreshToken) {
        authService.logout();
        void router.navigate(['/login']);

        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap((tokens) => {
          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });

          return next(retryRequest);
        }),
        catchError((refreshError: unknown) => {
          authService.logout();
          void router.navigate(['/login']);

          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
