import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";  // Import RouterModule
import { FooterSmallComponent } from "../../components/footers/footer-small/footer-small.component";
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";


@Component({
  selector: "app-auth",
  templateUrl: "./landing.component.html",
  standalone: true,
  imports: [IndexNavbarComponent, FooterSmallComponent, RouterModule],
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
