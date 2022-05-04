import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article, ArticlesService, User, UserService } from '../core';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article!: Article;
  currentUser!: User;
  canModify!: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      // { article: Article } instead any, but doesn't work'
      this.article = data.article;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;

      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }
}
