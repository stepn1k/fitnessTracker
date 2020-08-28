import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: []

})
export class AuthModule {
}
