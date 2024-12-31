import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CardSocialTrafficComponent } from '../../../../components/cards/card-social-traffic/card-social-traffic.component';
import { CardMembersComponent } from '../../../../components/cards/card-members/card-members.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule , CommonModule , CardMembersComponent , CardSocialTrafficComponent],
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
