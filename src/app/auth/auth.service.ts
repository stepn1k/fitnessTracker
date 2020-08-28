import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';

@Injectable({providedIn: 'root'})

export class AuthService {
  private isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService) {
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

  registerUser(authData: AuthData) {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(err => console.log(err));
  }

  login(authData: AuthData) {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(err => console.log(err));
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
