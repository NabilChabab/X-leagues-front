import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getAccessToken();
    const role = this.authService.getUserRole();
  
    if (token && route.url[0]?.path === 'auth') {
      if (role === 'ADMIN') {
        this.router.navigate(['/dashboard/admin']);
      } else if (role === 'MEMBER') {
        this.router.navigate(['/dashboard/member']);
      } else if (role === 'JURY') {
        this.router.navigate(['/dashboard/jury']);
      }
      return false;
    }

    if (route.url[0]?.path === 'auth') {
      return true;
    }

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
  
}
