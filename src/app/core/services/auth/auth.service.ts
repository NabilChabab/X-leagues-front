import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../../../app.constants';
import { NotificationService } from '../errors/errors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = API_BASE_URL;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
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
          localStorage.setItem('role', response.role);
          this.notificationService.showSuccess('Login Successful', `Welcome, ${response.role}!`);
        },
        error: () => {
          this.notificationService.showError('Login Failed', 'Invalid email or password');
        },
      }),
    );
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
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
}
