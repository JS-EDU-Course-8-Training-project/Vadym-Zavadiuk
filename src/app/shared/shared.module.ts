import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowAuthedDirective } from './show-authed.directive';
import { RouterModule } from '@angular/router';
import { FollowButtonComponent } from './buttons/follow-component.component';
import { FavoriteButtonComponent } from './buttons/favorite-button.component';
import {
  ArticleListComponent,
  ArticleMetaComponent,
  ArticlePreviewComponent,
} from './article-helpers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
  ],
  exports: [
    ArticlePreviewComponent,
    ArticleListComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ShowAuthedDirective,
    FollowButtonComponent,
  ],
})
export class SharedModule {}
