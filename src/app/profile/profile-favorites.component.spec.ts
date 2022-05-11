import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

import { ProfileFavoritesComponent } from './profile-favorites.component';

describe('ProfileFavoritesComponent', () => {
  let component: ProfileFavoritesComponent;
  let fixture: ComponentFixture<ProfileFavoritesComponent>;
  const fakeActivatedRoute = jasmine.createSpyObj('fakeActivatedRoute', [], {
    parent: {
      data: of({
        bio: 'Vadym Zavadiuk',
        email: 'zavadiuk@gmail.com',
        image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphdmFkaXVrQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTWFrZUl0TG9uZ2VyIiwiaWF0IjoxNjUxNzc4Nzk0LCJleHAiOjE2NTY5NjI3OTR9.po_pDTUdzFCmgz8UJN9lVYYCqvyIprVgv-j00A909fQ',
        username: 'MakeItLonger',
      }),
    },
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileFavoritesComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
