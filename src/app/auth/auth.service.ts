import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UIService} from '../shared/ui.service';

@Injectable({providedIn: 'root'})

export class AuthService {
  private isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService
  ) {
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.trainingService.userUid = user.uid;
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.trainingService.userUid = null;
        this.isAuthenticated = false;
        this.authChange.next(false);
      }
    });
  }

// TODO: create reusable method for authentication
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.uiService.loadingStateChanged.next(false))
      .catch(err => this.errorHandling(err));
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.uiService.loadingStateChanged.next(false))
      .catch(err => this.errorHandling(err));
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  errorHandling(err) {
    this.uiService.loadingStateChanged.next(false);
    this.uiService.showError(err.message, null, 3000);
  }
}
