import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthComponent} from './auth/auth.component';
import {TrainingComponent} from './training/training.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'training', component: TrainingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
