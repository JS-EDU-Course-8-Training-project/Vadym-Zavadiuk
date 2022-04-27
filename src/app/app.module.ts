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
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { ProfilesService } from './core/services/profile.service';
@NgModule({
  declarations: [AppComponent, HeaderComponent, ProfileComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ProfileModule,
  ],
  providers: [ApiService, UserService, JwtService, ProfilesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
