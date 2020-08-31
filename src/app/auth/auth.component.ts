import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode;
  public isLoading$: Observable<boolean>;

  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

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
