import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowAuthedDirective } from './show-authed.directive';
import { RouterModule } from '@angular/router';
import { FollowButtonComponent } from './buttons/follow-component.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [ShowAuthedDirective, FollowButtonComponent],
  exports: [
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
