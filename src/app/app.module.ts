import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { HeaderComponent, SharedModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.service';
import { ApiService } from './core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtService } from './core/services/jwt.service';
import { ProfileModule } from './profile/profile.module';
import { ProfilesService } from './core/services/profile.service';
import { EditorModule } from 'src/app/editor/editor.module';
import { ArticleModule } from 'src/app/article/article.module';
import { TagsService } from 'src/app/core';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ProfileModule,
    EditorModule,
    ArticleModule,
  ],
  providers: [
    ApiService,
    UserService,
    JwtService,
    ProfilesService,
    TagsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
