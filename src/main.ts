import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';
import { userReducer } from './app/core/store/user/user.reducer';
import { StateStorage } from './app/core/store/user/user.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      user: userReducer,
    }, {
      initialState: {
        user: StateStorage.loadUserState(),
      },
    }),

    MessageService
  ]
});
