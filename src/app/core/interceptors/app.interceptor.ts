import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('HTTP Response:', event);
        if (event instanceof HttpResponse) {
          if (event.status === 200 || event.status === 201) {
            const successMessage = 'Operation successful';
            console.log('Displaying success toast with message:', successMessage);
            this.messageService.add({
              severity: 'success', 
              summary: 'Success', 
              detail: successMessage,
              life: 3000
            });
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        let errorSummary = 'Error';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorSummary = 'Bad Request';
              errorMessage = error.error?.message || 'Invalid input';
              break;
            case 401:
              errorSummary = 'Unauthorized';
              errorMessage = 'Please log in again';
              break;
            case 403:
              errorSummary = 'Forbidden';
              errorMessage = 'You do not have permission';
              break;
            case 404:
              errorSummary = 'Not Found';
              errorMessage = 'Resource not found';
              break;
            case 500:
              errorSummary = 'Server Error';
              errorMessage = 'Internal server error';
              break;
            default:
              errorMessage = error.error?.message || `Error Code: ${error.status}`;
          }
        }

        this.messageService.add({
          severity: 'error', 
          summary: errorSummary, 
          detail: errorMessage,
          life: 3000
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}