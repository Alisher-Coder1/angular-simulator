import { IPost } from './post.interface';

export interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
