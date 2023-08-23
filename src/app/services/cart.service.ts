import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: IProduct[] = [];

  addToCart(product: IProduct) {
    this.cart.push(product);
  }

  getCartItems(): IProduct[] {
    return this.cart;
  }
}
