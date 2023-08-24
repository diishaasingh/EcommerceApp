import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './auth.guard';
import { ShippingDetailsComponent } from './components/shipping-details/shipping-details.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'products', component:ProductsViewComponent, canActivate:[authGuard]} ,
  {path: 'product-details/:id', component: ProductDetailsComponent },
  {path: 'cart', component:CartComponent},
  {path:'shipping-details',component:ShippingDetailsComponent},
  {path:'payment-details',component:PaymentDetailsComponent},
  {path:'order-summary',component:OrderSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
