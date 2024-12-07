import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  constructor(private authService : AuthService , private router : Router) { }

  onLogout(): void {
    this.authService.clearTokens();
    this.router.navigate(['/auth/login']);
  }

}
