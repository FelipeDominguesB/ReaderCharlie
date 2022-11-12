import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { AlertDialogComponent } from 'src/app/@shared/components/alert-dialog/alert-dialog.component';
import { User } from 'src/app/@shared/models/User';
import {throwError} from 'rxjs'
import {take, map, concatMap} from 'rxjs/operators'
import { chownSync } from 'fs';
import { FirebaseFoldersService } from 'src/app/@core/services/firebase-folders.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfirmPasswordDialogComponent } from 'src/app/@shared/components/confirm-password-dialog/confirm-password-dialog.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(private authService: FirebaseAuthenticationService, 
    private dialog: MatDialog,
    private folderService: FirebaseFoldersService,
    private angularFireAuth: AngularFireAuth) {  }

  user: User;
  ngOnInit(): void {
    this.authService.userInfo.subscribe(res =>{
        this.user = res;

    })
  }

  openConfirmationDialog(title: string, message: string, btn1Text: string, btn2Text?: string)
  {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: 
      {
        title: title, message: message, 
        buttons: [{text: btn1Text, color: 'warn', returnValue: true}, {text: btn2Text, color: 'primary', returnValue: false}]
      },
    });
    
    return dialogRef.afterClosed().pipe(take(1));
  }

  openErrorDialog(title: string, message: string, btn1Text: string)
  {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: 
      {
        title: title, message: message, 
        buttons: [{text: btn1Text, color: 'warn', returnValue: true}]
      },
    });
    
    return dialogRef.afterClosed().pipe(take(1));
  }

  openPasswordConfirmationDialog()
  {
    const dialogRef = this.dialog.open(ConfirmPasswordDialogComponent, {
      width: "400px",
    });

    return dialogRef.afterClosed().pipe(take(1));
    
  }

  confirmUserIdentity()
  {
      return this.openPasswordConfirmationDialog().pipe(take(1), concatMap(result =>{
          console.log(result);
          if(!result) 
          {
            console.log("Entrei aqui")
            throw new Error('Senha inválida');
          }
          return 'result'
      }))

  }

  confirmDelete()
  {
    this.openConfirmationDialog("Excluir conta", "Tem certeza que gostaria de excluir sua conta?", "Excluir", "Cancelar").subscribe({
        next: (response: boolean) =>{
          if(response)
          {
            this.deleteUserInfo();
          }
              
        },
        error: () =>{
          
        }
      })
  }

  deleteUserInfo()
  {
      this.angularFireAuth.user.subscribe(userData =>{
        if(userData)
        {
            this.folderService.deleteAllFoldersFromUser().subscribe({
              next: () => {
                  userData.delete()
                  .then(res =>{
                    this.authService.signOut()
                  })
                  .catch(err =>{
                      this.deleteUserError();
                  })
              },
              error: () => {

              }
            });
          }
      })
  }

  deleteUserError() {
    this.openErrorDialog("Erro ao excluir usuário", "Erro ao excluir usuário, por favor tente novamente", "Ok").subscribe(res => res);
  }


  initDeleteUserProcess()
  {
    this.confirmUserIdentity().pipe(take(1))
    .subscribe({ 
      next: () =>{
        this.confirmDelete()
      },
      error: () =>{
        this.openErrorDialog("Erro ao confirmar senha", "A senha não foi informada corretamente", "Ok").subscribe(res => res);
      }
    });
  }


}
