import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    FormsModule,
    CurrencyPipe,
    RouterLink,
    ButtonModule,
    CardModule,
    InputNumberModule,
    MessageModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartService = inject(CartService);

  readonly userId = 1;

  constructor() {
    if (this.cartService.items().length === 0) {
      this.cartService.loadUserCart(this.userId);
    }
  }

  onQuantityChange(productId: number, quantity: number | null): void {
    if (quantity === null) {
      return;
    }

    this.cartService.changeQuantity(productId, quantity);
  }

  removeProduct(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  saveCart(): void {
    this.cartService.saveCart(this.userId);
  }

  deleteCart(): void {
    this.cartService.deleteCart();
  }
}
