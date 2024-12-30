import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../../../app.constants';
import { NotificationService } from '../errors/errors.service';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.state';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = API_BASE_URL;
  user$: Observable<UserState>;

  constructor(
    private http: HttpClient,
    private store: Store<{ user: UserState }>,
    private notificationService: NotificationService,
  ) {
    this.user$ = this.store.select('user');
    this.checkAuthState();
  }

  ngOnInit() {
    this.checkAuthState();
  }

  private checkAuthState() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const decodedToken = this.decodeToken(accessToken);
      if (decodedToken) {
        this.store.dispatch(
          loginSuccess({
            id: decodedToken.id,
            username: decodedToken.username,
            role: decodedToken.role,
          })
        );

      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.user$.forEach((user) => user.isAuthenticated);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
      tap({
        next: () => this.notificationService.showSuccess('Registration Successful', 'You can now log in'),
        error: () => this.notificationService.showError('Registration Failed', 'Please check your details and try again'),
      }),
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/authenticate`, credentials).pipe(
      tap({
        next: (response: any) => {
          this.saveTokens(response.access_token, response.refresh_token);
          const decodedToken = this.decodeToken(response.access_token);
          this.store.dispatch(
            loginSuccess({
              id: decodedToken.id,
              username: decodedToken.username,
              role: decodedToken.role,
            })
          );
          localStorage.setItem('role', decodedToken.role);
          this.notificationService.showSuccess('Login Successful', `Welcome, ${decodedToken.role}!`);
        },
        error: () => {
          this.notificationService.showError('Login Failed', 'Invalid email or password');
        },
      }),
    );
  }

  logout(): void {
    this.clearTokens();
    this.store.dispatch(logout());
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
