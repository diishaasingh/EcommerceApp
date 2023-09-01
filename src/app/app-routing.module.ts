import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsViewComponent } from './products/products-view/products-view.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { LoginComponent } from './auth-module/auth/login/login.component';
import { CartComponent } from './cart/cart/cart.component';
import { authGuard } from './auth.guard';
// import { ShippingDetailsComponent } from './components/checkout/shipping-details/shipping-details.component';
// import { PaymentDetailsComponent } from './components/checkout/payment-details/payment-details.component';
// import { OrderSummaryComponent } from './components/checkout/order-summary/order-summary.component';
// import { SuccessComponent } from './components/success/success.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:ProductsViewComponent},
  {path:'products', component:ProductsViewComponent} ,
  {path:'product-details/:id', component: ProductDetailsComponent},
  {path:'cart', component:CartComponent},
  // {path:'shipping-details',component:ShippingDetailsComponent,canActivate:[authGuard]},
  // {path: 'payment-details', component: PaymentDetailsComponent },
  // {path:'order-summary',component:OrderSummaryComponent},
  // {path:'success',component:SuccessComponent},
  {path: 'checkout',component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

