import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SidenavItemComponent} from './sidenav/sidenav-item/sidenav-item.component';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavComponent,
    SidenavItemComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
