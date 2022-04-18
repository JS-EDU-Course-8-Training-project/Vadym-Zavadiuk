import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { User } from '../models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private http: HttpClient) {}

  setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  register(credentials: Object): Observable<any> {
    return this.http
      .post(`${environment.api_url}/users`, { user: credentials })
      .pipe(
        map((data: any) => {
          this.setAuth(data.user);
          return data;
        })
      );
  }

  login(credentials: Object) {
    this.http
      .post(`${environment.api_url}/users/login`, { user: credentials })
      .subscribe({
        next: (res) => console.log('our response', res),
        error: (e) => {
          console.log(JSON.stringify(e.error.errors));
        },
      });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
