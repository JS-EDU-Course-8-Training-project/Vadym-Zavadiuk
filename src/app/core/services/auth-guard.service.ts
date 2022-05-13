import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
