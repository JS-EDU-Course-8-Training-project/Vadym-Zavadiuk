import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Article } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  get(slug: string): Observable<Article> {
    return this.apiService
      .get('/articles/' + slug)
      .pipe(map((data) => data.article));
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService
        .put('/articles/' + article.slug, { article: article })
        .pipe(map((data) => data.article));
    } else {
      return this.apiService
        .post('/articles/', { article: article })
        .pipe(map((data) => data.article));
    }
  }
}
