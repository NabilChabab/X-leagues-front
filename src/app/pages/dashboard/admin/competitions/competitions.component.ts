import { Component } from '@angular/core';
import { CardMembersComponent } from '../../../../components/cards/card-members/card-members.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminCardCompetitionsComponent } from '../../../../components/cards/card-admin-competitions/card-admin-competitions.component';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [AdminCardCompetitionsComponent , RouterModule , CommonModule],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class AdminCompetitionsComponent {

}
