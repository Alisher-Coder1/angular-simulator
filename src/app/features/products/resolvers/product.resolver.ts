import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { IProduct } from '../interfaces/product.interface';
import { ProductApiService } from '../product-api.service';

export const productResolver: ResolveFn<IProduct> = (route) => {
  const id = Number(route.paramMap.get('id'));

  return inject(ProductApiService).getProductById(id);
};
