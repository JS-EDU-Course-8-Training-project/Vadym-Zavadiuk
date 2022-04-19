import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authType: String = ''; //make with enum and withdraw index.ts
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  register(credentials: Object) {
    this.isSubmitting = true;

    this.userService.register(credentials).subscribe({
      next: (data) => this.router.navigateByUrl('/'),
      error: (err) => {
        this.isSubmitting = false;
      },
    });
  }

  login(credentials: Object) {
    this.isSubmitting = true;

    this.userService.login(credentials).subscribe({
      next: (data) => this.router.navigateByUrl('/'),
      error: (err) => {
        this.isSubmitting = false;
      },
    });
  }

  submitForm() {
    const credentials = this.authForm.value;
    if (this.authType === 'login') {
      this.login(credentials);
    } else {
      this.register(credentials);
    }
  }
}
