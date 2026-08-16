import { Routes } from '@angular/router';

import { postResolver } from './posts/post.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        m => m.HomePageComponent,
      ),
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-page/user-page.component').then(
        m => m.UserPageComponent,
      ),
  },

  // Posts feature
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component').then(
        m => m.PostsComponent,
      ),
  },
  {
    path: 'posts/create',
    loadComponent: () =>
      import('./posts/post-create.component').then(
        m => m.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./posts/post-detail.component').then(
        m => m.PostDetailComponent,
      ),
    resolve: {
      post: postResolver,
    },
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        m => m.NotFoundPageComponent,
      ),
  },
];