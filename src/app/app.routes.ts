import { Routes } from '@angular/router';

export const routes: Routes = [
  // Главная страница открывается по адресу: /
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
    pathMatch: 'full',
  },

  // Страница пользователей открывается по адресу: /users
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-page/user-page.component').then(
        (m) => m.UserPageComponent,
      ),
  },

  // Любой неизвестный адрес открывает страницу «Страница не найдена».
  // Этот маршрут обязательно должен находиться последним.
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];