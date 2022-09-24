import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private firebaseAuthentication: FirebaseAuthenticationService, private router: Router) {

    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {

    localStorage.clear();
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
  
  public onSubmit()
  {

      this.firebaseAuthentication.login(this.email, this.password).then(authenticated =>{
          this.router.navigate(['/folders'])
      }).catch(err =>{
        console.log("deu erro: "  + err);
      });
      
  }

}
