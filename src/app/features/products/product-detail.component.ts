import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { IProduct } from './interfaces/product.interface';
import { CartService } from './cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink, ButtonModule, TagModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly cartService = inject(CartService);

  readonly product = toSignal(
    this.route.data.pipe(map((data) => data['product'] as IProduct)),
  );

  addToCart(): void {
    const product = this.product();

    if (!product) {
      return;
    }

    this.cartService.addProduct(product);
    void this.router.navigate(['/cart']);
  }
}
