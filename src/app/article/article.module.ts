import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolver.service';
import { SharedModule } from '../shared';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticleComponent],

  providers: [ArticleResolver],
})
export class ArticleModule {}
