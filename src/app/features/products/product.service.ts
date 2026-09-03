import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  defer,
  EMPTY,
  finalize,
  switchMap,
} from 'rxjs';

import {
  ProductApiService,
  ProductSortField,
  ProductSortOrder,
} from './product-api.service';
import { IProduct } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productApiService = inject(ProductApiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly products = signal<IProduct[]>([]);

  readonly categories = signal<string[]>([]);

  readonly search = signal('');

  readonly selectedCategory = signal<string | null>(null);

  readonly page = signal(1);

  readonly pageSize = signal(10);

  readonly sortField = signal<ProductSortField>('title');

  readonly sortOrder = signal<ProductSortOrder>('asc');

  readonly total = signal(0);

  readonly loading = signal(false);

  readonly error = signal<string | null>(null);

  readonly skip = computed(() => (this.page() - 1) * this.pageSize());

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );

  private readonly requestState = computed(() => ({
    search: this.search().trim(),
    category: this.selectedCategory(),
    limit: this.pageSize(),
    skip: this.skip(),
    sortBy: this.sortField(),
    order: this.sortOrder(),
  }));

  constructor() {
    this.loadCategories();

    toObservable(this.requestState)
      .pipe(
        debounceTime(300),
        switchMap((state) =>
          defer(() => {
            this.loading.set(true);
            this.error.set(null);

            let request$;

            if (state.search) {
              request$ = this.productApiService.searchProducts(
                state.search,
                state.limit,
                state.skip,
                state.sortBy,
                state.order,
              );
            } else if (state.category) {
              request$ = this.productApiService.getProductsByCategory(
                state.category,
                state.limit,
                state.skip,
                state.sortBy,
                state.order,
              );
            } else {
              request$ = this.productApiService.getProducts(
                state.limit,
                state.skip,
                state.sortBy,
                state.order,
              );
            }

            return request$.pipe(
              catchError(() => {
                this.products.set([]);
                this.total.set(0);
                this.error.set('Не удалось загрузить продукты.');

                return EMPTY;
              }),
              finalize(() => {
                this.loading.set(false);
              }),
            );
          }),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        this.products.set(response.products);
        this.total.set(response.total);
      });
  }

  setSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  setCategory(category: string | null): void {
    this.selectedCategory.set(category);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(Math.max(1, page));
  }

  setPageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.page.set(1);
  }

  setSortField(sortField: ProductSortField): void {
    this.sortField.set(sortField);
    this.page.set(1);
  }

  setSortOrder(sortOrder: ProductSortOrder): void {
    this.sortOrder.set(sortOrder);
    this.page.set(1);
  }

  private loadCategories(): void {
    this.productApiService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: () => {
          this.error.set('Не удалось загрузить категории.');
        },
      });
  }
}
