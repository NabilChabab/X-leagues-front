import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule , CompetitionsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class IndexComponent {

}
