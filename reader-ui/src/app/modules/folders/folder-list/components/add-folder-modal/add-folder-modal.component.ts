import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-folder-modal',
  templateUrl: './add-folder-modal.component.html',
  styleUrls: ['./add-folder-modal.component.scss']
})
export class AddFolderModalComponent implements OnInit {

  folderForm: FormGroup;
  get f() { return this.folderForm.controls; }
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddFolderModalComponent>) { 

    this.folderForm = this.formBuilder.group({
      folderName: ['', [Validators.required] ],
      isPublic: ['', [Validators.required] ],
      ageRestricted: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
      this.dialogRef.close({
        folderName: this.f.folderName.value,
        isPublic: (this.f.isPublic.value == "true") ,
        isAgeRestricted: (this.f.ageRestricted.value ? true : false)
      });
  }

  cancelCreate()
  {
    this.dialogRef.close();
  }
}
