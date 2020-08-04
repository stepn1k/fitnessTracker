import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode;

  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      // login or sign up mode
      this.isLoginMode = url[0].path === 'login';
    });

    if (!this.isLoginMode) {
      //  years old >= 18 years
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    // sign-up mode
    if (!this.isLoginMode) {
      this.authService.registerUser({
        email: form.value.email,
        password: form.value.password
      });
    }
    // login
    else {
      this.authService.login({
        email: form.value.email,
        password: form.value.password
      });
    }

    form.resetForm();
  }

  onSwitchMode() {
    const navigateTo = this.isLoginMode ? ['sign-up'] : ['login'];
    this.router.navigate(navigateTo);
  }
}
