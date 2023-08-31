import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<IProduct, number> = new Map(); // Key: product, Value: frequency

  addToCart(product: IProduct) {
    if (this.cart.has(product)) {
      this.cart.set(product, this.cart.get(product)! + 1);
    } else {
      this.cart.set(product, 1);
    }
  }

  getCartItems(): Map<IProduct, number> {
    return this.cart;
  }
  
  clearCart() {
    this.cart.clear();
  }

  getTotalItemCount(): number {
    let totalCount = 0;
    for (const frequency of this.cart.values()) {
      totalCount += frequency;
    }
    return totalCount;
  }
}
