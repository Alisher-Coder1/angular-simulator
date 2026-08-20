import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPost } from './interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {

  private readonly route = inject(ActivatedRoute);

  readonly post =
    this.route.snapshot.data['post'] as IPost;

}