import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { AlertDialogComponent } from 'src/app/@shared/components/alert-dialog/alert-dialog.component';
import { User } from 'src/app/@shared/models/User';
import {take} from 'rxjs/operators'
import { chownSync } from 'fs';
import { FirebaseFoldersService } from 'src/app/@core/services/firebase-folders.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(private authService: FirebaseAuthenticationService, 
    private dialog: MatDialog,
    private folderService: FirebaseFoldersService) {  }

  user: User;
  ngOnInit(): void {
    this.authService.userInfo.subscribe(res =>{
        this.user = res;
        console.log(this.user);
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

  deleteUser()
  {
      this
      .openConfirmationDialog("Excluir conta", "Tem certeza que gostaria de excluir sua conta?", "Excluir", "Cancelar")
      .subscribe({
        next: (response: boolean) =>{
            
              
        },
        error: () =>{

        }
      })
  }
}
