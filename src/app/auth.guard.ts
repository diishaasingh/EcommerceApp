import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true; 
  } else {
    const router: Router = inject(Router);
    router.navigate(['/login']); 
    return false;
  }
};
