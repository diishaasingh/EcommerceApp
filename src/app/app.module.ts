import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth-module/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsViewComponent } from './products/products-view/products-view.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './cart/cart/cart.component';
import { OrderSummaryComponent } from './components/checkout/order-summary/order-summary.component';
import { ShippingDetailsComponent } from './components/checkout/shipping-details/shipping-details.component';
import { PaymentDetailsComponent } from './components/checkout/payment-details/payment-details.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SuccessComponent } from './components/success/success.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsViewComponent,
    ProductDetailsComponent,
    NavbarComponent,
    CartComponent,
    ProductDetailsComponent,
    OrderSummaryComponent,
    ShippingDetailsComponent,
    PaymentDetailsComponent,
    SuccessComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatRadioModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title = 'loginForm';
}
