import { Component } from '@angular/core';
import { AuthService } from '..//..//auth-module/auth/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService,private router: Router) {} 

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(){
    console.log(localStorage.getItem('AUTH_TOKEN'))
    this.authService.logout();
    console.log(localStorage.getItem('AUTH_TOKEN'))
    this.router.navigate(['/products']);
  }
}
