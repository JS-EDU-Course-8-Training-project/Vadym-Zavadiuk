import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../../core/models';
import { ProfilesService, UserService } from '../../core/services';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-component.component.html',
  styleUrls: ['./follow-component.component.scss'],
})
export class FollowButtonComponent {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap({
                next: (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                error: (err) => (this.isSubmitting = false),
              })
            );
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap({
                next: (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                error: (err) => (this.isSubmitting = false),
              })
            );
          }
        })
      )
      .subscribe();
  }
}
