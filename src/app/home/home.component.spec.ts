import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { TagsService, UserService } from 'src/app/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const falseSubject = new BehaviorSubject<boolean>(false).asObservable();

  let fakeUserService = jasmine.createSpyObj('fakeUserService', [], {
    isAuthenticated: falseSubject,
  });
  const fakeTagsService = jasmine.createSpyObj('fakeTagsService', ['getAll']);
  fakeTagsService.getAll.and.returnValue(of(['1']));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: TagsService, useValue: fakeTagsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create with false observable', () => {
    expect(component).toBeTruthy();
  });

  fit('should all method setToList with "feed"', () => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    component.setListTo('feed', {});
    expect(spyRouter).toHaveBeenCalledWith('/login');
  });

  fit('should all method setToList with "feed"', () => {
    const routerService = TestBed.inject(Router);
    const spyRouter = spyOn(routerService, 'navigateByUrl');
    component.setListTo('feed', {});
    expect(spyRouter).toHaveBeenCalledWith('/login');
  });

  fit('should all method setToList with ""', () => {
    component.setListTo();
  });
});

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const trueSubject = new BehaviorSubject<boolean>(true).asObservable();
  let fakeUserService = jasmine.createSpyObj('fakeUserService', [], {
    isAuthenticated: trueSubject,
  });
  const fakeTagsService = jasmine.createSpyObj('fakeTagsService', ['getAll']);
  fakeTagsService.getAll.and.returnValue(of(['1']));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: TagsService, useValue: fakeTagsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create with true observable', () => {
    expect(component).toBeTruthy();
  });
});
