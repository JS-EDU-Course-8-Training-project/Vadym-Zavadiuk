import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, map, of, ReplaySubject, Subject, take } from 'rxjs';
import { UserService } from 'src/app/core';

import { NoAuthGuard } from './no-auth-guard.service';

describe('NoAuthGuard', () => {
  let service: NoAuthGuard;
  // const isAuthenticated = new BehaviorSubject<boolean>(false).asObservable();
  // const fakeUserService = {
  //   isAuthenticated,
  // };

  const fakeUserService = jasmine.createSpyObj('fakeUserService', [], {
    isAuthenticated: new BehaviorSubject<boolean>(false).asObservable(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    });
    service = TestBed.inject(NoAuthGuard);
  });

  fit('class NoAuthGuard should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method canActivate should be called', (done) => {
    service.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });
});
