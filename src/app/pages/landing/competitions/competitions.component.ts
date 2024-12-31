import { Component } from '@angular/core';
import { LatestCompetitionsService } from '../../../core/services/landing/latest-competitions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent {


  competitions: any[] = [];
  page: number = 0;
  size: number = 4;

  private randomImages: string[] = [
    'assets/img/index2.jpg',
    'assets/img/index.jpg',
    'assets/img/index4.jpg',
    'assets/img/index3.jpg',
  ];

  constructor(private competitionService: LatestCompetitionsService) {}

  ngOnInit(): void {
    this.loadCompetitions();
  }

  private getUniqueRandomImages(count: number): string[] {
    const shuffled = [...this.randomImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  loadCompetitions(): void {
    this.competitionService.findLatestCompetitions(this.page, this.size).subscribe({
      next: (data) => {
        const uniqueImages = this.getUniqueRandomImages(data.content.length);
        this.competitions = data.content.map((comp : any , index : any) => ({
          ...comp,
          imageUrl: uniqueImages[index]
        }));
        console.log(this.competitions);
      },
      error: (err) => {
        console.error('Error fetching competitions:', err);
      },
    });
  }

}
