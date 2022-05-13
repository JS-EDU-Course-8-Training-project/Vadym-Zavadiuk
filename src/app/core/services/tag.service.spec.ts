import { TestBed } from '@angular/core/testing';

import { TagsService } from './tag.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Profile } from 'src/app/core';

describe('TagsService', () => {
  let service: TagsService;

  const fakeApiService = jasmine.createSpyObj('fakeApiService', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TagsService,
        { provide: ApiService, useValue: fakeApiService },
      ],
    });
    service = TestBed.inject(TagsService);
  });

  fit('class TagsService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method getAll should be return observable with string', (done) => {
    fakeApiService.get.and.returnValue(of({ tags: 'tags' }));
    service.getAll().subscribe((result) => {
      expect(result).toEqual('tags');
      done();
    });
  });
});
