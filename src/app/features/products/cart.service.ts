import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { CartApiService } from './cart-api.service';
import { ICartApiProduct } from './interfaces/cart.interface';
import { IProduct } from './interfaces/product.interface';

const TAX_RATE = 0.2;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartApiService = inject(CartApiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly cartId = signal<number | null>(null);

  readonly userId = signal<number | null>(null);

  readonly items = signal<ICartApiProduct[]>([]);

  readonly loading = signal(false);

  readonly error = signal<string | null>(null);

  readonly itemsCount = computed(() =>
    this.items().reduce((count, item) => count + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  readonly tax = computed(() => this.subtotal() * TAX_RATE);

  readonly total = computed(() => this.subtotal() + this.tax());

  loadUserCart(userId: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.userId.set(userId);

    this.cartApiService
      .getUserCart(userId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          const cart = response.carts[0];

          if (!cart) {
            this.cartId.set(null);
            this.items.set([]);
            return;
          }

          this.cartId.set(cart.id);
          this.items.set(cart.products);
        },
        error: () => {
          this.error.set('Не удалось загрузить корзину.');
        },
      });
  }

  addProduct(product: IProduct): void {
    this.items.update((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? this.updateItemQuantity(item, item.quantity + 1)
            : item,
        );
      }

      const newItem: ICartApiProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        total: product.price,
        discountPercentage: product.discountPercentage,
        discountedTotal: product.price * (1 - product.discountPercentage / 100),
        thumbnail: product.thumbnail,
      };

      return [...items, newItem];
    });
  }

  changeQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.id === productId ? this.updateItemQuantity(item, quantity) : item,
      ),
    );
  }

  removeProduct(productId: number): void {
    this.items.update((items) => items.filter((item) => item.id !== productId));
  }

  createCart(userId: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.cartApiService
      .createCart(userId, this.items())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (cart) => {
          this.cartId.set(cart.id);
          this.userId.set(cart.userId);
          this.items.set(cart.products);
        },
        error: () => {
          this.error.set('Не удалось создать корзину.');
        },
      });
  }

  updateCart(): void {
    const cartId = this.cartId();

    if (cartId === null) {
      this.error.set('Корзина ещё не создана.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.cartApiService
      .updateCart(cartId, this.items())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (cart) => {
          this.items.set(cart.products);
        },
        error: () => {
          this.error.set('Не удалось обновить корзину.');
        },
      });
  }

  saveCart(userId: number): void {
    if (this.cartId() === null) {
      this.createCart(userId);
      return;
    }

    this.updateCart();
  }

  deleteCart(): void {
    const cartId = this.cartId();

    if (cartId === null) {
      this.clearLocalCart();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.cartApiService
      .deleteCart(cartId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.clearLocalCart();
        },
        error: () => {
          this.error.set('Не удалось удалить корзину.');
        },
      });
  }

  clearLocalCart(): void {
    this.cartId.set(null);
    this.userId.set(null);
    this.items.set([]);
    this.error.set(null);
  }

  private updateItemQuantity(
    item: ICartApiProduct,
    quantity: number,
  ): ICartApiProduct {
    const total = item.price * quantity;

    return {
      ...item,
      quantity,
      total,
      discountedTotal: total * (1 - item.discountPercentage / 100),
    };
  }
}
