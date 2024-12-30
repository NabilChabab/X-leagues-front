import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserState } from "../../../core/store/user/user.state";
import { AuthService } from "../../../core/services/auth/auth.service";
import {Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class AdminNavbarComponent implements OnInit {
   navbarOpen = false;
   user$: Observable<UserState>;
   username: string | null = null;
   role: string | null = null;
   isAuthenticated = false;

   constructor(
     public authService: AuthService,
     private router: Router,
     private store: Store<{ user: UserState }>,
   ) {
     this.user$ = this.store.select('user');
   }

   ngOnInit(): void {
     this.user$.subscribe(user => {
       this.username = user.username;
       this.isAuthenticated = user.isAuthenticated;
       this.role = user.role;
     });
   }

   setNavbarOpen() {
     this.navbarOpen = !this.navbarOpen;
   }

   logout() {
     this.authService.logout();
     this.router.navigate(['/auth/login']);
   }
}
