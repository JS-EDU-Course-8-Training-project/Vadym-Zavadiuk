import { TestBed } from '@angular/core/testing';

import { ProfilesService } from './profile.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Profile } from 'src/app/core';

describe('ProfilesService', () => {
  let service: ProfilesService;

  const fakeApiService = jasmine.createSpyObj('fakeApiService', [
    'post',
    'delete',
    'get',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProfilesService,
        { provide: ApiService, useValue: fakeApiService },
      ],
    });
    service = TestBed.inject(ProfilesService);
  });

  fit('class ProfilesService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method get should be return observable with profile', (done) => {
    fakeApiService.get.and.returnValue(of({ profile: 'profile' }));
    service.get('string').subscribe((result) => {
      expect(result).toEqual('profile' as any as Profile);
      done();
    });
  });

  fit('method follow should be return observable with profile', (done) => {
    fakeApiService.post.and.returnValue(of({}));
    service.follow('string').subscribe((result) => {
      expect(result).toEqual({} as any as Profile);
      done();
    });
  });

  fit('method unfollow should be return observable with profile', (done) => {
    fakeApiService.delete.and.returnValue(of({}));
    service.unfollow('string').subscribe((result) => {
      expect(result).toEqual({} as any as Profile);
      done();
    });
  });
});
