import { Component, OnInit,Input } from '@angular/core';
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
  @Input() shippingData: IShippingData | null = null;
  // shippingData!: IShippingData ;
  showMessage: boolean = false; 

  constructor(
    private actRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}
  
  cart: { product: IProduct, quantity: number }[] = [];
  
  ngOnInit() {
    const shippingDataString = this.actRoute.snapshot.queryParams['shippingData'];
    if (shippingDataString) {
      this.shippingData = JSON.parse(shippingDataString);
    }
    this.cart = this.cartService.getCartItems();
    console.log(this.cart);
  }

  getProductFrequency(product: IProduct): number {
    const cartItem = this.cart.find(item => item.product === product);
    return cartItem ? cartItem.quantity : 0;
  }

  calculateTotal(product: IProduct): number {
    const cartItem = this.cart.find(item => item.product === product);
    return cartItem ? product.price * cartItem.quantity : 0;
  }

  cartItemsKeys(): IProduct[] {
    return this.cart.map(item => item.product);
  }  

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const cartItem of this.cart) {
      grandTotal += cartItem.product.price * cartItem.quantity;
    }
    return grandTotal;
  }

  confirmOrder(){ 
    this.router.navigate(['/payment-details']);
  }
}
