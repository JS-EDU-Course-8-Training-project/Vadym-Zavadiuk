import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile } from '../core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      //{ profile: Profile } instead any, but doesn't work
      this.profile = data.profile;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.isUser = this.currentUser.username === this.profile.username;
    });
  }

  onToggleFollowing(following: any) {
    //boolean, but doesn't work
    this.profile.following = following;
  }
}
