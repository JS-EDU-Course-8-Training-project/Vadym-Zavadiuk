import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article, ArticlesService, UserService } from '../../core';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap({
                next: () => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                error: () => (this.isSubmitting = false),
              })
            );
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
              tap({
                next: () => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                error: () => (this.isSubmitting = false),
              })
            );
          }
        })
      )
      .subscribe();
  }
}
