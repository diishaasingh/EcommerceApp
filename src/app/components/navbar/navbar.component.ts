import { Component } from '@angular/core';
import { AuthService } from '..//..//auth-module/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  countCartItem: number = 0; 

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.updateCartItemCount();
    this.cartService.cartItemUpdated.subscribe((count: number) => {
      this.countCartItem = count; // Update the countCartItem variable
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    this.authService.logout();
    this.cartService.clearCart();
    this.updateCartItemCount(); 
    this.router.navigate(['/products']);
  }

  private updateCartItemCount() {
    this.countCartItem = this.cartService.getTotalItemCount();
  }
}
