import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message =
          error.status === 0
            ? 'Ошибка сети. Проверьте подключение и попробуйте снова.'
            : `Ошибка HTTP ${error.status}. Попробуйте позже.`;

        messageService.showError(message);
      }

      return throwError(() => error);
    }),
  );
};
