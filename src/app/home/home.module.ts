import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from 'src/app/home/home-routing.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
