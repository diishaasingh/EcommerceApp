import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products.model';
import { CartService } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: Map<IProduct, number> = new Map(); // Key: product, Value: frequency

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cart = this.cartService.getCartItems(); 
  }
  
  getProductFrequency(product: IProduct): number {
    return this.cart.get(product) || 0;
  }

  increment(product: IProduct) {   
    if (this.cart.has(product)) {
      this.cartService.addToCart(product);
    }   
  }

  decrement(product: IProduct) {
    if (this.cart.has(product)) {
      const frequency = this.cart.get(product)!;
      if (frequency === 1) {
        this.removeFromCart(product);
      } else {
        this.cart.set(product, frequency - 1);
      }
    }   
  }

  cartItems(): IProduct[] {
    return Array.from(this.cart.keys());
  }

  removeFromCart(product: IProduct) {
    this.cart.delete(product);
  }

  calculateTotal(product: IProduct): number {
    const frequency = this.cart.get(product) || 0;
    const total = product.price * frequency;
    return Number(total.toFixed(2));
  }
  

  buyNow(product: IProduct){
    const grandTotal = this.calculateTotal(product);
    this.router.navigate(['/shipping-details'], { queryParams: { total: grandTotal } });
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const [product, frequency] of this.cart.entries()) {
      grandTotal += product.price * frequency;
    }
    return Number(grandTotal.toFixed(2));
  }

  buyAll() {
    const grandTotal = this.calculateGrandTotal();
    this.router.navigate(['/shipping-details'], { queryParams: { total: grandTotal } });
  }
}
