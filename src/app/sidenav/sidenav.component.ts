import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isOpen = false;
  public isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLogout() {
    this.authService.logout();
  }

}
