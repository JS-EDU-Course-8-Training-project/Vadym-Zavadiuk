import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [ProfileComponent],
  providers: [ProfileResolver],
})
export class ProfileModule {}
