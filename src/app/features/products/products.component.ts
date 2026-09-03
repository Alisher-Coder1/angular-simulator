import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductSortField, ProductSortOrder } from './product-api.service';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { IProduct } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputTextModule,
    PaginatorModule,
    RatingModule,
    SelectModule,
    SkeletonModule,
    TagModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly productService = inject(ProductService);

  private readonly cartService = inject(CartService);

  private readonly router = inject(Router);

  readonly pageSizeOptions = [10, 20, 30];

  readonly sortFieldOptions: {
    label: string;
    value: ProductSortField;
  }[] = [
    {
      label: 'Название',
      value: 'title',
    },
    {
      label: 'Цена',
      value: 'price',
    },
    {
      label: 'Рейтинг',
      value: 'rating',
    },
    {
      label: 'Остаток',
      value: 'stock',
    },
  ];

  readonly sortOrderOptions: {
    label: string;
    value: ProductSortOrder;
  }[] = [
    {
      label: 'По возрастанию',
      value: 'asc',
    },
    {
      label: 'По убыванию',
      value: 'desc',
    },
  ];

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.productService.setSearch(input.value);
  }

  onCategoryChange(category: string | null): void {
    this.productService.setCategory(category);
  }

  onSortFieldChange(sortField: ProductSortField): void {
    this.productService.setSortField(sortField);
  }

  onSortOrderChange(sortOrder: ProductSortOrder): void {
    this.productService.setSortOrder(sortOrder);
  }

  onPageChange(event: { page?: number; rows?: number }): void {
    const page = (event.page ?? 0) + 1;
    const pageSize = event.rows ?? this.productService.pageSize();

    if (pageSize !== this.productService.pageSize()) {
      this.productService.setPageSize(pageSize);
      return;
    }

    this.productService.setPage(page);
  }

  addToCart(product: IProduct): void {
    this.cartService.addProduct(product);
    void this.router.navigate(['/cart']);
  }
}
