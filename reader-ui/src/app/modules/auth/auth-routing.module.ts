import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistryFormComponent } from './registry-form/registry-form.component';

const childrenRoutes: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'sign-in', component: LoginFormComponent},
  { path: 'sign-up', component: RegistryFormComponent}
];

const routes: Routes = [
  { path: '', component: AuthComponent, children: childrenRoutes},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }