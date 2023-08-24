import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IShippingData } from 'src/app/models/shippingData.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  shippingData: IShippingData | undefined;

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    const shippingDataString = this.actRoute.snapshot.queryParams['shippingData'];
    if (shippingDataString) {
      this.shippingData = JSON.parse(shippingDataString);
    }
  }
}
