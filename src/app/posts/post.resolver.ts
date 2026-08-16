import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { IPost } from './interfaces/post.interface';
import { PostService } from './post.service';

export const postResolver: ResolveFn<IPost> = route => {
  const postId = Number(route.paramMap.get('id'));

  return inject(PostService).getPostById(postId);
};