import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, } from '@angular/core';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { loaderInterceptor } from './interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([loaderInterceptor, loggingInterceptor, errorInterceptor,]),
  ),
    providePrimeNG({
  theme: { preset: Aura,
    options: { darkModeSelector: '.app-dark',
    },
  },
}),
  ],
};