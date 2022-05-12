import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './article.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const config = {
    filters: { author: 'MakeItLonger', limit: 10, offset: 10 },
    type: 'all',
  };

  const configFeed = {
    filters: { author: 'MakeItLonger', limit: 10, offset: 10 },
    type: 'feed',
  };

  const responseQuery = {
    articles: [
      {
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
      {
        slug: 'asdfasdfasdfasdf-38579',
        title: 'asdfasdfasdfasdf',
        description: 'sadf',
        body: 'sadf',
        tagList: [],
        createdAt: '2022-05-09T13:13:59.312Z',
        updatedAt: '2022-05-09T13:13:59.312Z',
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'MakeItLonger',
          bio: 'Vadym Zavadiuk',
          image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
          following: false,
        },
      },
    ],
    articlesCount: 16,
  };

  const response = {
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
  };

  const response2 = {
    slug: '',
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
  };
  const fakeApiService = jasmine.createSpyObj('fakeApiService', [
    'post',
    'put',
    'delete',
    'get',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ArticlesService,
        { provide: ApiService, useValue: fakeApiService },
      ],
    });
    service = TestBed.inject(ArticlesService);
  });

  fit('class ApiService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method query with "config.type !== "feed"" should be return observable with "{ articles: Article[]; articlesCount: number }"', (done) => {
    fakeApiService.get.and.returnValue(of(responseQuery));
    service.query(config).subscribe((result) => {
      expect(result).toEqual(responseQuery);
      done();
    });
  });

  fit('method query with "config.type = "feed"" should be return observable with "{ articles: Article[]; articlesCount: number }"', (done) => {
    fakeApiService.get.and.returnValue(of(responseQuery));
    service.query(configFeed).subscribe((result) => {
      expect(result).toEqual(responseQuery);
      done();
    });
  });

  fit('method get should be return observable with artilce', (done) => {
    fakeApiService.get.and.returnValue(of({ article: response }));
    service.get('fffffdfdfafd-38579').subscribe((result) => {
      expect(result).toEqual(response);
      done();
    });
  });

  fit('method favorite should be return observable with artilce', (done) => {
    fakeApiService.post.and.returnValue(of(response));
    service.favorite('fffffdfdfafd-38579').subscribe((result) => {
      expect(result).toEqual(response);
      done();
    });
  });

  fit('method unfavorite should be return observable with artilce', (done) => {
    fakeApiService.delete.and.returnValue(of(response));
    service.unfavorite('fffffdfdfafd-38579').subscribe((result) => {
      expect(result).toEqual(response);
      done();
    });
  });

  fit('method destroy should call method apiService.delete', () => {
    fakeApiService.get.and.returnValue(of({ article: response }));
    service.destroy('123');
    expect(fakeApiService.delete).toHaveBeenCalledWith('/articles/123');
  });

  fit('method save with article.slug should be return observable with artilce', (done) => {
    fakeApiService.put.and.returnValue(of({ article: response }));
    service.save(response).subscribe((result) => {
      expect(result).toEqual(response);
      done();
    });
  });

  fit('method save without article.slug should be return observable with artilce', (done) => {
    fakeApiService.post.and.returnValue(of({ article: response2 }));
    service.save(response2).subscribe((result) => {
      expect(result).toEqual(response2);
      done();
    });
  });
});
