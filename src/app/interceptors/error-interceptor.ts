import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { MessageService } from '../../services/message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: unknown) => {
  
  if (
    error instanceof HttpErrorResponse &&
    error.status >= 500 &&
    error.status < 600
  ) {
    messageService.showError(
      `Ошибка сервера (${error.status}). Попробуйте позже.`,
    );
  }

  return throwError(() => error);
}),
  );
};