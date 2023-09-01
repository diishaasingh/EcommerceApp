import { Injectable,EventEmitter } from '@angular/core';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { product: IProduct, quantity: number }[] = [];
  cartItemUpdated: EventEmitter<number> = new EventEmitter<number>(); // Event emitter


  addToCart(product: IProduct) {
    const cartItem = this.cart.find(item => item.product === product);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.cartItemUpdated.emit(this.getTotalItemCount());
  }

  getCartItems(): { product: IProduct, quantity: number }[] {
    return this.cart;
  }
  
  clearCart() {
    this.cart = [];
    this.cartItemUpdated.emit(this.getTotalItemCount());
  }

  removeFromCart(product: IProduct) {
    this.cart = this.cart.filter(item => item.product !== product);
    this.cartItemUpdated.emit(this.getTotalItemCount());
  }

  decrementCartItem(product: IProduct) {
    const cartItem = this.cart.find(item => item.product === product);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      this.removeFromCart(product);
    }
    this.cartItemUpdated.emit(this.getTotalItemCount());
  }

  getTotalItemCount(): number {
    let totalCount = 0;
    for (const cartItem of this.cart) {
      totalCount += cartItem.quantity;
    }
    return totalCount;
  }
}
