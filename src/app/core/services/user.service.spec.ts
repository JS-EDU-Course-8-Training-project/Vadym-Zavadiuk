import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ApiService, JwtService, User } from 'src/app/core';

describe('UserService', () => {
  let service: UserService;

  const fakeHttpService = jasmine.createSpyObj('fakeHttpService', ['post']);
  const fakeApiService = jasmine.createSpyObj('fakeApiService', ['put', 'get']);
  const fakeJwtService = jasmine.createSpyObj('fakeJwtService', [
    'getToken',
    'saveToken',
    'destroyToken',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: HttpClient, useValue: fakeHttpService },
        { provide: ApiService, useValue: fakeApiService },
        { provide: JwtService, useValue: fakeJwtService },
      ],
    });
    service = TestBed.inject(UserService);
    fakeJwtService.getToken.and.returnValue('token');
  });

  fit('class UserService should be created', () => {
    fakeApiService.get.and.returnValue(of({ user: 'user' }));
    expect(service).toBeTruthy();
  });

  fit('method populate with token should call method ApiService.get', () => {
    fakeJwtService.getToken.and.returnValue('token');
    fakeApiService.get.and.returnValue(of({ user: 'user' }));
    service.populate();
  });

  fit('method populate without token should call method purgeAuth', () => {
    fakeJwtService.getToken.and.returnValue('');
    fakeApiService.get.and.returnValue(of({ user: 'user' }));
    service.populate();
  });

  fit('method populate with token should call method purgeAuth', () => {
    fakeJwtService.getToken.and.returnValue('token');
    fakeApiService.get.and.returnValue(
      new Observable((observer: { error: (arg0: Error) => void }) => {
        observer.error(new Error('error'));
      })
    );
    service.populate();
  });

  fit('method register should call method http.psot', (done) => {
    fakeHttpService.post.and.returnValue(of({ user: 'user' }));
    service.register({}).subscribe((result) => {
      expect(result).toEqual({ user: 'user' });
      done();
    });
  });

  fit('method login should call method http.post', (done) => {
    fakeHttpService.post.and.returnValue(of({ user: 'user' }));
    service.login({}).subscribe((result) => {
      expect(result).toEqual({ user: 'user' });
      done();
    });
  });

  fit('method update should call rmethod apiService.put', (done) => {
    fakeApiService.put.and.returnValue(of({ user: 'user' }));
    service.update({} as any as User).subscribe((result) => {
      expect(result).toEqual('user' as any as User);
      done();
    });
  });

  fit('method getCurrentUser should call', () => {
    service.getCurrentUser();
  });
});
