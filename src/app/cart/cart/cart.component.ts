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
  cart: { product: IProduct, quantity: number }[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cart = this.cartService.getCartItems(); 
  }
  
  getProductQuantity(product: IProduct): number {
    const cartItem = this.cart.find(item => item.product === product);
    return cartItem ? cartItem.quantity : 0;
  }

  increment(product: IProduct) {
    this.cartService.addToCart(product);
    this.cart = this.cartService.getCartItems();
  }

  decrement(product: IProduct) {
    this.cartService.decrementCartItem(product);
    this.cart = this.cartService.getCartItems();
  }

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCartItems();
  }

  calculateTotal(product: IProduct): number {
    const cartItem = this.cart.find(item => item.product === product);
    const quantity = cartItem ? cartItem.quantity : 0;
    const total = product.price * quantity;
    return Number(total.toFixed(2));
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const cartItem of this.cart) {
      grandTotal += cartItem.product.price * cartItem.quantity;
    }
    return Number(grandTotal.toFixed(2));
  }

  buyAll() {
    const grandTotal = this.calculateGrandTotal();
    this.router.navigate(['/checkout'], { queryParams: { total: grandTotal } });
  }
}
