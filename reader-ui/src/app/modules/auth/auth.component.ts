import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: FirebaseAuthenticationService) {

    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.authService.signOut();
  }

  public getEmailErrorMessage() {

    if (this.f.email.hasError('required')) {
      return 'E-mail não preenchido';
    }else{
      return 'E-mail inválido'
    }
  }

  public getPasswordErrorMessage()
  {
    return "Senha não preenchida"
  }

  get f() { return this.loginForm.controls; }

  public onSubmit()
  {
      
  }

}
