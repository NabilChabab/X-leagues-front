import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
            if (response.role === 'MEMBER') {
              this.router.navigate(['/dashboard/member']);
            } else if (response.role === 'ADMIN') {
              this.router.navigate(['/dashboard/admin']);
            } else if (response.role === 'JURY') {
              this.router.navigate(['/dashboard/jury']);
            } else {
              this.errorMessages['global'] = 'Invalid role';
            }
        },
        error: (error) => {
          this.errorMessages = {};
          if (error.error) {
            const backendErrors = error.error;
            Object.keys(backendErrors).forEach((key) => {
              this.errorMessages[key] = backendErrors[key];
            });
          } else {
            this.errorMessages['global'] = 'Login failed';
          }
        }
      });
    }
  }
}