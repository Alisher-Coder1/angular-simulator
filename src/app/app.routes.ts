import { Routes } from '@angular/router';
import { productResolver } from './features/products/resolvers/product.resolver';
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

  // Homework 29 — Products & Cart feature
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
    resolve: {
      product: productResolver,
    },
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/products/cart.component').then((m) => m.CartComponent),
  },

  {
    path: 'homework-28',
    loadComponent: () =>
      import('./pages/homework-28/homework-28.component').then(
        (m) => m.Homework28Component,
      ),
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
