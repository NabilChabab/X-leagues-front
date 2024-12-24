import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  user$ : Observable<UserState>;

  constructor(private store : Store<{user : UserState}>, private router: Router) {
    this.user$ = this.store.select('user');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = route.data['role'];
    const userRole = this.user$.forEach((user) => user.role)

    if (userRole === requiredRole) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
