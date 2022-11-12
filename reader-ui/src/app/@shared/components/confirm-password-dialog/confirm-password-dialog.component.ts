import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthCredential, EmailAuthCredential, EmailAuthProvider, user} from '@angular/fire/auth'
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrls: ['./confirm-password-dialog.component.scss']
})
export class ConfirmPasswordDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmPasswordDialogComponent>, private angularFireAuth: AngularFireAuth) { }

  public password: string;
  ngOnInit(): void {
  }


  confirmUserPassword(passWord: string)
  {
    this.angularFireAuth.user.pipe(take(1)).subscribe((userData) =>{

        const credential = EmailAuthProvider.credential(userData!.email!, passWord);

        userData?.reauthenticateWithCredential(credential)
        .then(res =>{
          this.dialogRef.close(true);
        })
        .catch(err =>{
          this.dialogRef.close(false);
        })
    })
  }

}
