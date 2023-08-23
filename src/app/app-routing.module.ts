import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'products', component:ProductsViewComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
