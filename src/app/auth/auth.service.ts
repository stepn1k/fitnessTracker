import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import * as fromRoot from '../app.reducer';

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.trainingService.userUid = user.uid;
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.trainingService.userUid = null;
        this.trainingService.cancelSubscriptions();
      }
    });
  }

// TODO: create reusable method for authentication
  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.store.dispatch(new UI.StopLoading()))
      .catch(err => this.errorHandling(err));
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.store.dispatch(new UI.StopLoading()))
      .catch(err => this.errorHandling(err));
  }

  logout() {
    this.fireAuth.signOut();
  }

  errorHandling(err) {
    this.store.dispatch(new UI.StopLoading());
    this.uiService.showError(err.message, null, 3000);
  }
}
