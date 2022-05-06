import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolver.service';
import { SharedModule } from '../shared';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleCommentComponent } from './article-comment.component';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticleComponent, ArticleCommentComponent],

  providers: [ArticleResolver],
})
export class ArticleModule {}
