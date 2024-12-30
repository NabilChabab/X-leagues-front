import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";  // Import RouterModule
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";
import { FooterComponent } from "../../components/footers/footer/footer.component";
import { CompetitionsComponent } from "../../pages/landing/competitions/competitions.component";


@Component({
  selector: "app-auth",
  templateUrl: "./landing.component.html",
  standalone: true,
  imports: [IndexNavbarComponent, FooterComponent, RouterModule , CompetitionsComponent],
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
