import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  const response = {
    article: {
      slug: 'fffffdfdfafd-38579',
      title: 'fffffdfdfafd',
      description: 'asdf',
      body: 'sadf',
      tagList: [],
      createdAt: '2022-05-09T13:14:54.505Z',
      updatedAt: '2022-05-09T13:14:54.505Z',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'MakeItLonger',
        bio: 'Vadym Zavadiuk',
        image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
        following: false,
      },
    },
  };
  const fakeHttpService = jasmine.createSpyObj('fakeHttpService', [
    'post',
    'put',
    'delete',
    'get',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiService,
        { provide: HttpClient, useValue: fakeHttpService },
      ],
    });
    service = TestBed.inject(ApiService);
  });

  fit('class ApiService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method post should be return observable with obj', (done) => {
    fakeHttpService.post.and.returnValue(of(response));
    service
      .post('/profiles/' + 'MakeItLonger' + '/follow')
      .subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
  });

  fit('method put should be return observable with obj', (done) => {
    fakeHttpService.put.and.returnValue(of(response));
    service
      .put('/profiles/' + 'MakeItLonger' + '/follow')
      .subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
  });

  fit('method delete should be return observable with obj', (done) => {
    fakeHttpService.delete.and.returnValue(of(response));
    service
      .delete('/profiles/' + 'MakeItLonger' + '/follow')
      .subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
  });

  fit('method get should be return observable with obj', (done) => {
    fakeHttpService.get.and.returnValue(of(response));
    service
      .get('/profiles/' + 'MakeItLonger' + '/follow')
      .subscribe((result) => {
        expect(result).toEqual(response);
        done();
      });
  });
});
