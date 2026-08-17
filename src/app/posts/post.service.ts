import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IPost } from './interfaces/post.interface';
import { IPostResponse } from './interfaces/post-response.interface';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly postApiService = inject(PostApiService);

  private readonly postsSubject = new BehaviorSubject<IPost[]>([]);
  private readonly totalSubject = new BehaviorSubject<number>(0);

  public readonly posts$: Observable<IPost[]> =
    this.postsSubject.asObservable();

  public readonly total$: Observable<number> =
    this.totalSubject.asObservable();

  public loadPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip).pipe(
      tap(response => {
        this.postsSubject.next(response.posts);
        this.totalSubject.next(response.total);
      }),
    );
  }

  public getPostById(id: number): Observable<IPost> {
    return this.postApiService.getPostById(id);
  }

  public createPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.postApiService.createPost(post);
  }

  public updatePost(
    id: number,
    post: Partial<IPost>,
  ): Observable<IPost> {
    return this.postApiService.updatePost(id, post);
  }

  public deletePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id);
  }
}