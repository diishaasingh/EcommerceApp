import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm: FormGroup;
  @Output() paymentCompleted = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,private router:Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmitPayment() {
    if (this.paymentForm.valid) {
      this.router.navigate(['/success']);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.paymentForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
