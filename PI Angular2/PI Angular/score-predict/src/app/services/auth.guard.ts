import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Use jwtDecode here
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        // Check roles if specified in route data
        const requiredRoles = route.data['roles'];
        if (requiredRoles && !requiredRoles.includes(decodedToken.role)) {
          this.router.navigate(['/home']); // Redirect if role doesn't match
          return false;
        }

        return true; // Token is valid
      } catch (error) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false; // No token found
  }
}
