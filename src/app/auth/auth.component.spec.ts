import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, switchMap, throwError, timer } from 'rxjs';
import { AuthModule } from 'src/app/auth/auth.module';
import { UserService } from 'src/app/core';

import { AuthComponent } from './auth.component';

describe('AuthComponent with "register"', () => {
  const fakeUserService = {
    register: () => {},
    login: () => {},
  } as any as UserService;

  const fakeRoute = {
    url: of([{ parameters: {}, path: 'register' } as any as UrlSegment]),
  };

  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [AuthModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: ActivatedRoute, useValue: fakeRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('class AuthComponent should create', () => {
    expect(component).toBeTruthy();
  });

  fit('hook ngOnInit should call method addControl and return value', () => {
    const spyControl = spyOn(component.authForm, 'addControl');
    component.ngOnInit();
    expect(spyControl).toHaveBeenCalled();
    expect(component.authForm.get('username')).toBeTruthy();
  });

  fit('hook ngOnInit should be called', () => {
    component.ngOnInit();
  });

  fit('method register should call method Router.navigateByUrl with "/"', () => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    spyOn(fakeUserService, 'register').and.returnValue(of(1));
    component.register({});
    expect(spyRouter).toHaveBeenCalledWith('/');
  });

  fit('method register should change value isSubmitting to false after error', fakeAsync(() => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    spyOn(fakeUserService, 'register').and.returnValue(
      timer(300).pipe(switchMap(() => throwError(() => new Error())))
    );
    component.register({});
    expect(component.isSubmitting).toEqual(true);
    tick(400);
    expect(component.isSubmitting).toEqual(false);
    expect(spyRouter).not.toHaveBeenCalledWith('/');
  }));

  fit('method login should call method Router.navigateByUrl with "/"', () => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    spyOn(fakeUserService, 'login').and.returnValue(of(1));
    component.login({});
    expect(spyRouter).toHaveBeenCalledWith('/');
  });

  fit('method login should change value isSubmitting to false after error', fakeAsync(() => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    spyOn(fakeUserService, 'login').and.returnValue(
      timer(300).pipe(switchMap(() => throwError(() => new Error())))
    );
    component.login({});
    expect(component.isSubmitting).toEqual(true);
    tick(400);
    expect(component.isSubmitting).toEqual(false);
    expect(spyRouter).not.toHaveBeenCalledWith('/');
  }));

  fit('method submitForm should call method register with credentials', () => {
    const fakeAuthValue = {
      email: '',
      password: '',
      username: null,
    };
    const spyControl = spyOn(component, 'register');
    component.submitForm();
    expect(spyControl).toHaveBeenCalledWith(fakeAuthValue);
  });

  fit('method submitForm should call method login with credentials', () => {
    const fakeAuthValue = {
      email: '',
      password: '',
      username: null,
    };
    const spyControl = spyOn(component, 'login');
    component.authType = 'login';
    component.submitForm();
    expect(spyControl).toHaveBeenCalledWith(fakeAuthValue);
  });
});

describe('AuthComponent with "login"', () => {
  const fakeUserService = {
    register: () => {},
    login: () => {},
  } as any as UserService;

  const fakeRoute = {
    url: of([{ parameters: {}, path: 'login' } as any as UrlSegment]),
  };

  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [AuthModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: ActivatedRoute, useValue: fakeRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('hook ngOnInit should NOT call method addControl and return value', () => {
    const spyControl = spyOn(component.authForm, 'addControl');
    component.ngOnInit();
    expect(spyControl).not.toHaveBeenCalled();
  });
});
