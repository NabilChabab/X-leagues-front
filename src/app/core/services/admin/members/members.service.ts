import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private apiUrl = API_BASE_URL;

    constructor(private http : HttpClient) { }

    findMembers(page: number, size: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/users`, {
        withCredentials: true,
        params: { page: page.toString(), size: size.toString() }
      });
    }
}
