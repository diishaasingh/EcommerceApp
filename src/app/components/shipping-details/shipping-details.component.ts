import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IShippingData } from 'src/app/models/shippingData.model';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
  shippingDetailsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.shippingDetailsForm = this.formBuilder.group({
      shippingData: this.formBuilder.group({
        name: [null, [Validators.required]],
        address: [null, [Validators.required]],
        pincode: [null, [Validators.required]],
        contact: [null, [Validators.required]]
      })
    });
  }

  onSubmit(): void {
    if (this.shippingDetailsForm.valid) {
      const shippingData: IShippingData = this.shippingDetailsForm.get('shippingData')?.value;
      this.router.navigate(['/order-summary'], {
        queryParams: { shippingData: JSON.stringify(shippingData) }
      });
    }
  }
}
