import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TableLazyLoadEvent, TableModule, } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogModule, } from 'primeng/dynamicdialog';
import { IPost } from './interfaces/post.interface';
import { PostService } from './post.service';
import { PostEditDialogComponent } from './post-edit-dialog.component';

@Component({
  selector: 'app-posts',
  imports: [ TableModule, SkeletonModule, ContextMenuModule, DynamicDialogModule, ],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {

  private readonly postService = inject(PostService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  private readonly dialogService = inject(DialogService);

  posts: IPost[] = [];

  totalRecords = 0;

  rows = 10;

  first = 0;

  isLoading = false;

  readonly rowsPerPageOptions = [10, 20, 50];

  selectedPost: IPost | null = null;

  readonly contextMenuItems: MenuItem[] = [
    {
      label: 'Просмотреть',
      icon: 'pi pi-eye',
      command: () => {
        if (this.selectedPost) {
          void this.router.navigate([
            '/posts',
            this.selectedPost.id,
          ]);
        }
      },
    },
    {
      label: 'Редактировать',
      icon: 'pi pi-pencil',
      command: () => {
        if (this.selectedPost) {
          this.openEditDialog(this.selectedPost);
        }
      },
    },
   {
  label: 'Удалить',
  icon: 'pi pi-trash',
  command: () => {
   
    if (this.selectedPost) {
      this.deletePost(this.selectedPost);
    }
  },
},
  ];

  loadPosts(
    event: TableLazyLoadEvent,
  ): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.isLoading = true;

    this.posts = Array.from({ length: this.rows }, (_, index) => ({
  id: -(index + 1),
  title: '',
  body: '',
  tags: [],
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0,
  userId: 0,
}));

    this.postService
      .loadPosts(this.rows, this.first)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: response => {
          this.posts = response.posts;
          this.totalRecords = response.total;
        },
        error: () => {
          this.posts = [];
        },
      });
  }

  openPost(post: IPost): void {
    void this.router.navigate([
      '/posts',
      post.id,
    ]);
  }

  openEditDialog(post: IPost): void {
    const dialogRef = this.dialogService.open(
      PostEditDialogComponent,
      {
        header: 'Редактирование поста',
        width: '32rem',
        modal: true,
        closable: true,
        data: {
          post,
        },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
      },
    );

    if (!dialogRef) {
      return;
    }

    dialogRef.onClose
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(
        (updatedPost: IPost | undefined) => {
          if (!updatedPost) {
            return;
          }

          this.posts = this.posts.map(
            postItem =>
              postItem.id === updatedPost.id
                ? updatedPost
                : postItem,
          );
        },
      );
  }

  deletePost(post: IPost): void {
    this.postService
      .deletePost(post.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.posts = this.posts.filter(
            postItem => postItem.id !== post.id,
          );

          if (this.totalRecords > 0) {
            this.totalRecords -= 1;
          }

          this.selectedPost = null;
        },
      });
  }

}