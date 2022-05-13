import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, map, of, ReplaySubject, Subject, take } from 'rxjs';
import { UserService } from 'src/app/core';

import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let service: AuthGuard;

  const fakeUserService = jasmine.createSpyObj('fakeUserService', [], {
    isAuthenticated: new BehaviorSubject<boolean>(false).asObservable(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    });
    service = TestBed.inject(AuthGuard);
  });

  fit('class NoAuthGuard should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method canActivate should be called', (done) => {
    service.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      done();
    });
  });
});
