import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleListConfig, Profile } from '../core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  profile!: Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit() {
    console.log(this.route.parent?.data);
    this.route.parent?.data.subscribe((data: any) => {
      this.profile = data.profile;
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }
}
