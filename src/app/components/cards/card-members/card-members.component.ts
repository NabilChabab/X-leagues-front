import { Component, OnInit } from "@angular/core";
import { MembersService } from "../../../core/services/admin/members/members.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card-members",
  templateUrl: "./card-members.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class CardMembersComponent implements OnInit {
  members: any[] = [];
  page: number = 0; // Current page index
  size: number = 6; // Number of items per page
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading = true;
    this.membersService.findLatestCompetitions(this.page, this.size).subscribe({
      next: (data) => {
        this.members = data.content;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load members", err);
      },
    });
  }

  // Go to the previous page
  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadMembers();
    }
  }

  // Go to the next page
  nextPage(): void {
    this.page++;
    this.loadMembers();
  }

  getInitials(username: string): string {
    // Split the username by spaces or take the first two characters if no spaces
    return username.split(' ').map(word => word[0].toUpperCase()).slice(0, 2).join('');
  }

  getAvatarColor(username: string): string {
    // You can generate a color based on the username using hash, for example
    const hash = Array.from(username).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 30%, ${Math.floor(Math.random() * 10) + 20}%)`;  // Generates a color from the hash of the username
    return color;
  }
}
