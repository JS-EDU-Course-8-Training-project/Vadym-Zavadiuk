import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';
@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
