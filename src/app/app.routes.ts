import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  // Главная страница открывается по адресу: /
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },

  // Страница пользователей открывается по адресу: /users
  {
    path: 'users',
    component: UserPageComponent,
  },

  // Любой неизвестный адрес открывает страницу «Страница не найдена».
  // Этот маршрут обязательно должен находиться последним.
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];