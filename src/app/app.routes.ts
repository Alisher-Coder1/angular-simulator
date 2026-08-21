import { Routes } from '@angular/router';
import { postResolver } from './posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { adminGuard } from './features/auth/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
    pathMatch: 'full',
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/user-page/user-page.component').then(
        (m) => m.UserPageComponent,
      ),
  },

  // Posts feature
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./posts/post-create.component').then(
        (m) => m.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./posts/post-detail.component').then(
        (m) => m.PostDetailComponent,
      ),
    resolve: {
      post: postResolver,
    },
  },

  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
