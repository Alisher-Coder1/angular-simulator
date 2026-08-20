import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const startedAt = performance.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Math.round(performance.now() - startedAt);

          console.warn(
            `[HTTP] ${ req.method } ${ req.urlWithParams } | Status: ${ event.status } | Time: ${ duration } ms`,
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration = Math.round(performance.now() - startedAt);

        console.error(
          `[HTTP] ${ req.method } ${ req.urlWithParams } | Status: ${ error.status } | Time: ${ duration } ms`,
        );
      },
    }),
  );
};