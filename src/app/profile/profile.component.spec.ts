import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { User, UserService } from '../core';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const fakeUserService = jasmine.createSpyObj('fakeUserService', [], {
    currentUser: of({
      bio: 'Vadym Zavadiuk',
      email: 'zavadiuk@gmail.com',
      image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphdmFkaXVrQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTWFrZUl0TG9uZ2VyIiwiaWF0IjoxNjUxNzc4Nzk0LCJleHAiOjE2NTY5NjI3OTR9.po_pDTUdzFCmgz8UJN9lVYYCqvyIprVgv-j00A909fQ',
      username: 'MakeItLonger',
    }),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              profile: {
                bio: 'Vadym Zavadiuk',
                following: false,
                image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
                username: 'MakeItLonger',
              },
            }),
          },
        },
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('class ProfileComponent should create', () => {
    expect(component).toBeTruthy();
  });

  fit('method onToggleFollowing should write boolean value into property "following"', () => {
    const randomNumber = Math.random();
    const randomBooleanValue = randomNumber > 0.5 ? true : false;

    component.onToggleFollowing(randomBooleanValue);
    expect(component.profile.following).toBe(randomBooleanValue);
  });
});
