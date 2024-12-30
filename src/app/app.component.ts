import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { UserState } from './core/store/user/user.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule , ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'x-leagues-front';

  constructor(private store: Store<{ user: UserState }>) {
    this.store.select('user');
  }
}
