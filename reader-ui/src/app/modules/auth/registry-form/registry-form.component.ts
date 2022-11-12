import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { AlertDialogComponent } from 'src/app/@shared/components/alert-dialog/alert-dialog.component';
import { UserRegistryObject } from 'src/app/@shared/models/User';
import {take} from 'rxjs/operators'
@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegistryFormComponent implements OnInit {

  
  registryForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public firebaseAuthentication: FirebaseAuthenticationService, public dialog: MatDialog) {

    this.registryForm = this.formBuilder.group({
        userName: ['', [Validators.required] ],
        email: ['', [Validators.required, Validators.email] ],
        passwords: this.formBuilder.group ({
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirm_password: ['', [Validators.required]],

        }, { validators: this.confirmPasswords})
    });
   }
  get f() { return this.registryForm.controls; }
  get passwordsGroup() { return this.registryForm['controls']['passwords']}
  get passwordsGroupControls() { return this.registryForm['controls']['passwords']['controls']}

  ngOnInit(): void {
  }

  confirmPasswords(control: AbstractControl) {
    if(control.get('password')?.value !== control.get('confirm_password')?.value) 
      return {invalid: true}
    
    return null;
  }
  createUser()
  {
    let user: UserRegistryObject = {email: this.f.email.value, displayName: this.f.userName.value, password: this.passwordsGroupControls.password.value };

    this.firebaseAuthentication.signUp(user).then(res =>{
      this.openConfirmationDialog("Sucesso!", "Cadastro realizado com sucesso!", "Ok").subscribe({
        next: () =>{
            this.firebaseAuthentication.login(this.f.email.value, this.passwordsGroupControls.password.value)
        },
        error: () =>{}
      });
      
    }).catch(err =>{

      let message = this.getErrorMessage(err.message);
      this.openConfirmationDialog("Erro!", message, "Ok").subscribe();
    });
 
  }

  openConfirmationDialog(title: string, message: string, btn1Text: string, btn2Text?: string)
  {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: {title: title, message: message, buttons: [{text: btn1Text, color: 'primary', returnValue: true}]},
    });
    
    return dialogRef.afterClosed().pipe(take(1));
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
    if(this.passwordsGroup['controls']['password'].hasError('invalid'))
    {
      return 'Senha não preenchida'
    }
    else{
      return 'Senha tem um tamanho mínimo de 10 caractéres'
    }
  }



  getErrorMessage(firebaseErr:string ) : string
  {
      if(firebaseErr.includes("weak-password")) {
        return "Erro ao realizar o cadastro, senha muito fraca! Certifique-se que sua senha possua 6 ou mais caractéres."
      }
      if(firebaseErr.includes("email-already-in-use")){
        return "Erro ao realizar o cadastro, o e-mail informado já está sendo utilizado no sistema!"
      }
      return "Erro inesperado ao realizar o cadastro, tente novamente!";
  }
}
