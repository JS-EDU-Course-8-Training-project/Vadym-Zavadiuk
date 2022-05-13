import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [JwtService],
    });
    service = TestBed.inject(JwtService);
  });

  fit('class JwtService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method getToken should return token from localStorage', () => {
    expect(service.getToken()).toBe(window.localStorage['token']);
  });

  fit('class saveToken should save token to localStorage', () => {
    expect(service.saveToken('token')).toHaveBeenCalled;
  });

  fit('class destroyToken should be call localStorage.removeItem', () => {
    const spy = spyOn(window.localStorage, 'removeItem');
    service.destroyToken();
    expect(spy).toHaveBeenCalledWith('token');
  });
});
