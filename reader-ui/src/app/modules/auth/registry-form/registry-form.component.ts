import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        password: ['', [Validators.required]]
    });
   }
  get f() { return this.registryForm.controls; }
  ngOnInit(): void {
  }

  createUser()
  {
    let user: UserRegistryObject = {email: this.f.email.value, displayName: this.f.userName.value, password: this.f.password.value };

    this.firebaseAuthentication.signUp(user).then(res =>{
      this.openConfirmationDialog("Sucesso!", "Cadastro realizado com sucesso!", "Ok").subscribe({
        next: () =>{
            this.firebaseAuthentication.login(this.f.email.value, this.f.password.value)
        },
        error: () =>{}
      });
      
    }).catch(err =>{

      let message = this.getErrorMessage(err.message);
      this.openConfirmationDialog("Erro!", message, "Ok").subscribe(res =>{
        console.log(res);
      });
    });
 
  }

  openConfirmationDialog(title: string, message: string, btn1Text: string, btn2Text?: string)
  {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: {title: title, message: message, btn1Text: btn1Text, btn2Text: btn2Text},
    });
    
    return dialogRef.afterClosed().pipe(take(1));
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
