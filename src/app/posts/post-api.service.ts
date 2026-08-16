import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPost } from './interfaces/post.interface';
import { IPostResponse } from './interfaces/post-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly http = inject(HttpClient);

  private readonly postsUrl = 'https://dummyjson.com/posts';

  public getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(this.postsUrl, {
      params: {
        limit,
        skip,
      },
    });
  }

  public getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.postsUrl}/${id}`);
  }

  public createPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>(
      `${this.postsUrl}/add`,
      post,
    );
  }

  public updatePost(
    id: number,
    post: Partial<IPost>,
  ): Observable<IPost> {
    return this.http.patch<IPost>(
      `${this.postsUrl}/${id}`,
      post,
    );
  }

  public deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(
      `${this.postsUrl}/${id}`,
    );
  }
}