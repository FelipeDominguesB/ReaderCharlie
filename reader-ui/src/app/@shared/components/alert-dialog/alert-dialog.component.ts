import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, buttons: buttonProps[]}) { }

  ngOnInit(): void {
  }


  closeDialog(result: any)
  {
      this.dialogRef.close(result);
  }
}

export interface buttonProps{
  text: string;
  returnValue: any;
  color: string;
}