import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '../models';
import { map } from 'rxjs/operators';

import { HttpParams } from '@angular/common/http';

@Injectable()
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  query(
    config: ArticleListConfig
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    const params = {};

    Object.keys(config.filters).forEach((key) => {
      (params as any)[key] = (config.filters as any)[key];
    });

    return this.apiService.get(
      '/articles' + (config.type === 'feed' ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

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

  favorite(slug: string): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

  destroy(slug: string) {
    return this.apiService.delete('/articles/' + slug);
  }
}
