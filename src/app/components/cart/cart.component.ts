import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: IProduct[] = [];
  countMap: Map<number, number> = new Map(); //key- product.id, value- freq

  constructor(private cartService: CartService, private router: Router) {}

 
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(); 
    this.buildCountMap();
  }
  
  buildCountMap() {
    this.countMap.clear(); 
    for (const item of this.cartItems) {
      if (this.countMap.has(item.id)) {
        this.countMap.set(item.id, this.countMap.get(item.id)! + 1); 
      } else {
        this.countMap.set(item.id, 1); 
      }
    }
  }
  getProductFrequency(productId: number): number {
    return this.countMap.get(productId) || 0;
  }

  increment(productId: number) {   
      const product = this.getProduct(productId); 
      if (product) {
        this.countMap.set(productId, this.countMap.get(productId)! + 1);
        this.cartService.addToCart(product);
      }   
  }

  decrement(productId: number) {
    const product = this.getProduct(productId); 
      if (product) {
        this.countMap.set(productId, this.countMap.get(productId)! - 1);
        if(this.countMap.get(productId) === 0){
          this.removeFromCart(productId);
        }
      }   
  }

  countMapKeys(): number[] {
    return Array.from(this.countMap.keys());
  }

  getProduct(productId: number): IProduct | undefined {
    return this.cartItems.find(item => item.id === productId);
  }

  removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.countMap.delete(productId);
    }
  }

  calculateTotal(productId: number): number {
    const product = this.getProduct(productId);
    if (product) {
      const frequency = this.countMap.get(productId) || 0;
      return product.price * frequency;
    }
    return 0;
  }

  buyNow(productId:number){
    const grandTotal = this.calculateTotal(productId);
    //this.removeFromCart(productId);
    this.router.navigate(['/shipping-details'], { queryParams: { total: grandTotal } });
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const [productId, frequency] of this.countMap.entries()) {
      const product = this.getProduct(productId);
      if (product) {
        grandTotal += product.price * frequency;
      }
    }
    return grandTotal;
  }

  buyAll() {
    const grandTotal = this.calculateGrandTotal();
    this.router.navigate(['/shipping-details'], { queryParams: { total: grandTotal } });
    // this.countMap.clear();
    // this.cartItems = [];
  }
}