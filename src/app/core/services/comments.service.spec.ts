import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Comment } from '../models/comment.model';

describe('CommentsService', () => {
  let service: CommentsService;

  const fakeApiService = jasmine.createSpyObj('fakeApiService', [
    'post',
    'delete',
    'get',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CommentsService,
        { provide: ApiService, useValue: fakeApiService },
      ],
    });
    service = TestBed.inject(CommentsService);
  });

  fit('class ApiService should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('method add should be return observable with comment', (done) => {
    fakeApiService.post.and.returnValue(of({ comment: 'comment' }));
    service.add('string1', 'string2').subscribe((result) => {
      expect(result).toEqual('comment' as any as Comment);
      done();
    });
  });

  fit('method getAll should be return observable with comment', (done) => {
    fakeApiService.get.and.returnValue(of({ comments: 'comments' }));
    service.getAll('string').subscribe((result) => {
      expect(result).toEqual('comments' as any as Comment[]);
      done();
    });
  });

  fit('method destroy should call method UserService.delete', () => {
    service.destroy(1, 'string');
    expect(fakeApiService.delete).toHaveBeenCalledWith(
      '/articles/string/comments/1'
    );
  });
});
