import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResolver } from './profile-resolver.service';
@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [],
  providers: [ProfileResolver],
})
export class ProfileModule {}
