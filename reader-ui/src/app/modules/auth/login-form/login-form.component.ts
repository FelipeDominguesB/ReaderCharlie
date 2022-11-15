import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, public firebaseAuthentication: FirebaseAuthenticationService, private angularFireAuth: AngularFireAuth) {

    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {

    this.firebaseAuthentication.signOut();
  }

  onSubmit()
  {
    this.loginFailed = false
    this.angularFireAuth.signInWithEmailAndPassword(this.f.email.value, this.f.password.value)
        .then(() => {
          
          return this.firebaseAuthentication.saveInformationOnStorage();
        })
        .then(() => {
          setTimeout(() =>{
            this.router.navigate(['/folders']);
          }, 100);

        })
        .catch(err => { this.loginFailed = true});
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
  get email() { return this.loginForm.controls['email'].value };
  get password() { return this.loginForm.controls['password'].value };
  


}
