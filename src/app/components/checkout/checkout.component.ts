import { Component } from '@angular/core';
import { IShippingData } from 'src/app/models/shippingData.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  shippingData: IShippingData | null = null;

  updateOrderSummary(shippingData: IShippingData) {
    this.shippingData = shippingData;
  }
}
