import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: IProduct[] = [];
  private countMap: Map<number, number> = new Map(); //key- product.id, value- freq

  addToCart(product: IProduct) {
    this.cart.push(product);
  }

  getCartItems(): IProduct[] {
    return this.cart;
  }
  
}
