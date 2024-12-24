import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserState } from "../../../core/store/user/user.state";
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
  standalone: true,
  imports: [RouterModule, CommonModule ,SidebarModule,ButtonModule],
})
export class IndexNavbarComponent implements OnInit {
  visible: boolean = false;
  navbarOpen = false;
  user$: Observable<UserState>;
  username: string | null = null;
  isAuthenticated = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.select("user");
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.username = user.username;
      this.isAuthenticated = user.isAuthenticated;
    });
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
