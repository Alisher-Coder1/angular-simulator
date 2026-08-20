import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

import { IPost } from './interfaces/post.interface';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private readonly config = inject(DynamicDialogConfig);

  private readonly dialogRef = inject(DynamicDialogRef);

  private readonly postService = inject(PostService);

  private readonly post: IPost =
    this.config.data.post as IPost;

  title = this.post.title;

  tags = this.post.tags.join(', ');

  views = this.post.views;

  isSaving = false;

  save(): void {
    if (!this.title.trim() || this.isSaving) {
      return;
    }

    const changes: Partial<IPost> = {
      title: this.title.trim(),
      tags: this.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      views: Number(this.views),
    };

    this.isSaving = true;

    this.postService
      .updatePost(this.post.id, changes)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
      )
      .subscribe({
        next: updatedPost => {
          this.dialogRef.close({
            ...this.post,
            ...updatedPost,
            ...changes,
          });
        },
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}