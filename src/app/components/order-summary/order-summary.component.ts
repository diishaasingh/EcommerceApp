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

  constructor(private actRoute: ActivatedRoute,private cartService:CartService, private router: Router ) {}
  
  cartItems: IProduct[] = [];
  countMap: Map<number, number> = new Map();
  ngOnInit() {
    const shippingDataString = this.actRoute.snapshot.queryParams['shippingData'];
    if (shippingDataString) {
      this.shippingData = JSON.parse(shippingDataString);
    }
    this.cartItems = this.cartService.getCartItems();
    this.buildCountMap();
    console.log(this.countMap);
    console.log(this.cartItems);
  }
  buildCountMap() {
    for (const item of this.cartItems) {
      if (this.countMap.has(item.id)) {
        this.countMap.set(item.id, this.countMap.get(item.id)! + 1);
      } else {
        this.countMap.set(item.id, 1);
      }
    }
  }

  getProduct(productId: number): IProduct | undefined {
    return this.cartItems.find(item => item.id === productId);
  }
  getProductFrequency(productId: number): number {
    return this.countMap.get(productId) || 0;
  }
  calculateTotal(productId: number): number {
    const product = this.getProduct(productId);
    if (product) {
      const frequency = this.countMap.get(productId) || 0;
      return product.price * frequency;
    }
    return 0;
  }
  countMapKeys(): number[] {
    return Array.from(this.countMap.keys());
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
  confirmOrder(){
      // this.showMessage = true; 
      this.router.navigate(['/payment-details']);
  }
}
