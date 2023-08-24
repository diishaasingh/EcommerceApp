import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: IProduct[] = [];
  // private countMap: Map<number, number> = new Map(); //key- product.id, value- freq

  addToCart(product: IProduct) {
    this.cart.push(product);
  }

  getCartItems(): IProduct[] {
    return this.cart;
  }

  // buildCountMap() {
  //   this.countMap.clear(); 
  //   for (const item of this.cart) {
  //     if (this.countMap.has(item.id)) {
  //       this.countMap.set(item.id, this.countMap.get(item.id)! + 1); 
  //     } else {
  //       this.countMap.set(item.id, 1); 
  //     }
  //   }
  // }

  // getProductFrequency(productId: number): number {
  //   return this.countMap.get(productId) || 0;
  // }

  // countMapKeys(): number[] {
  //   return Array.from(this.countMap.keys());
  // }

  // getProduct(productId: number): IProduct | undefined {
  //   return this.cart.find(item => item.id === productId);
  // }

  // removeFromCart(productId: number) {
  //   const index = this.cart.findIndex(item => item.id === productId);
  //   if (index !== -1) {
  //     this.cart.splice(index, 1);
  //     this.countMap.delete(productId);
  //   }
  // }

  // calculateTotal(productId: number): number {
  //   const product = this.getProduct(productId);
  //   if (product) {
  //     const frequency = this.countMap.get(productId) || 0;
  //     return product.price * frequency;
  //   }
  //   return 0;
  // }

  // calculateGrandTotal(): number {
  //   let grandTotal = 0;
  //   for (const [productId, frequency] of this.countMap.entries()) {
  //     const product = this.getProduct(productId);
  //     if (product) {
  //       grandTotal += product.price * frequency;
  //     }
  //   }
  //   return grandTotal;
  // }
}
