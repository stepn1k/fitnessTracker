import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'sign-up', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AuthRoutingModule {
}
