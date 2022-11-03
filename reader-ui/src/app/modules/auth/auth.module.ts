import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field'
import {  MatCardModule } from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule} from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistryFormComponent } from './registry-form/registry-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegistryFormComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class AuthModule { }
