import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IShippingData } from 'src/app/models/shippingData.model';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
  @Output() shippingDataSubmitted = new EventEmitter<IShippingData>();
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
      this.shippingDataSubmitted.emit(shippingData);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.shippingDetailsForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}