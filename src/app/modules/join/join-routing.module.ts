import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from '@src/app/modules/join/components/forgot/forgot.component';
import { LoginComponent } from '@src/app/modules/join/components/login/login.component';
import { SignupComponent } from '@src/app/modules/join/components/signup/signup.component';
import { VerifyComponent } from '@src/app/modules/join/components/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'remember-me',
    component: ForgotComponent
  },
  {
    path: 'verify/:userId',
    component: VerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinRoutingModule { }
