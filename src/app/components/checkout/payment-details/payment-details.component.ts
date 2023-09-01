import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnChanges {
  paymentForm!: FormGroup;
  @Output() paymentCompleted = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(10)]],
      expirationDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      paymentOption: ['credit', [Validators.required]]
    });
  }

  ngOnChanges(){
    if (this.paymentForm.valid) {
      this.paymentCompleted.emit(true);
    }
  }

  onSubmitPayment(): void {
    if (this.paymentForm.valid) {
      this.paymentCompleted.emit(true);
      this.router.navigate(['/success']);
    }
    else {
      console.log('Form is invalid or has not been touched');
    }
  }
}