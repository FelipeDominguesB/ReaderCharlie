import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistryFormComponent } from './registry-form/registry-form.component';


const routes: Routes = [
  { path: '', component: LoginFormComponent},
  { path: 'sign-up', component: RegistryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }