import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MembersService } from '../../../core/services/admin/members/members.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersResolver implements Resolve<any> {
  constructor(private membersService: MembersService) {}

  resolve(): Observable<any> {
    const page = 0;
    const size = 6;
    return this.membersService.findMembers(page, size);
  }
}
