import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import {
  ApiService,
  JwtService,
  UserService,
  AuthGuard,
  ProfilesService,
  ArticlesService,
  CommentsService,
} from './services';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UserService,
    JwtService,
    AuthGuard,
    ProfilesService,
    ArticlesService,
    CommentsService,
  ],
  declarations: [],
})
export class CoreModule {}
