import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map((user) =>
      user.role === 'admin'
        ? true
        : router.createUrlTree(['/']),
    ),
    catchError(() => of(router.createUrlTree(['/']))),
  );
};