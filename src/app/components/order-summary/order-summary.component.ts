import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/products.model';
import { IShippingData } from 'src/app/models/shippingData.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  shippingData: IShippingData | undefined;
  showMessage: boolean = false; 

  constructor(
    private actRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}
  
  cartItems: Map<IProduct, number> = new Map();
  
  ngOnInit() {
    const shippingDataString = this.actRoute.snapshot.queryParams['shippingData'];
    if (shippingDataString) {
      this.shippingData = JSON.parse(shippingDataString);
    }
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }

  getProductFrequency(product: IProduct): number {
    return this.cartItems.get(product) || 0;
  }

  calculateTotal(product: IProduct): number {
    const frequency = this.cartItems.get(product) || 0;
    return product.price * frequency;
  }

  cartItemsKeys(): IProduct[] {
    return Array.from(this.cartItems.keys());
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const [product, frequency] of this.cartItems.entries()) {
      grandTotal += product.price * frequency;
    }
    return grandTotal;
  }

  confirmOrder(){ 
    this.router.navigate(['/payment-details']);
  }
}
