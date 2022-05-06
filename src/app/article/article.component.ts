import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  Article,
  ArticlesService,
  User,
  UserService,
  CommentsService,
  Comment,
} from '../core';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article!: Article;
  currentUser!: User;
  canModify!: boolean;
  isSubmitting = false;
  isDeleting = false;
  comments!: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.article = data.article;
    });

    this.populateComments();

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;

      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug).subscribe((success) => {
      this.router.navigateByUrl('/');
    });
  }

  populateComments() {
    this.commentsService
      .getAll(this.article.slug)
      .subscribe((comments) => (this.comments = comments));
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService.add(this.article.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
      },
      (errors) => {
        this.isSubmitting = false;
        this.commentFormErrors = errors;
      }
    );
  }

  onDeleteComment(comment: Comment) {
    this.commentsService
      .destroy(comment.id, this.article.slug)
      .subscribe(() => {
        this.comments = this.comments.filter((item) => item !== comment);
      });
  }
}
