import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IPost } from './interfaces/post.interface';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private readonly formBuilder = inject(FormBuilder);

  private readonly postService = inject(PostService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  isSubmitting = false;

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tags: [''],
    userId: [1, [Validators.required, Validators.min(1)]],
  });

  createPost(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const post: Omit<IPost, 'id'> = {
      title: formValue.title.trim(),
      body: formValue.body.trim(),
      tags: formValue.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      views: 0,
      userId: formValue.userId,
    };

    this.isSubmitting = true;

    this.postService
      .createPost(post)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          void this.router.navigate(['/posts']);
        },
      });
  }

  cancel(): void {
    void this.router.navigate(['/posts']);
  }

}