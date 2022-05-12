import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleListConfig, Profile } from '../core';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss'],
})
export class ProfileArticlesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  profile!: Profile;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.data.subscribe((data: any) => {
        this.profile = data.profile;
        this.articlesConfig = {
          type: 'all',
          filters: {},
        };
        this.articlesConfig.filters.author = this.profile.username;
      });
    }
  }
}
