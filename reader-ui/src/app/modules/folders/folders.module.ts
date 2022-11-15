import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersComponent } from './folders.component';
import { FoldersRoutingModule } from './folders-routing.module';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddFolderModalComponent } from './folder-list/components/add-folder-modal/add-folder-modal.component';
import { FolderSpecificationModalComponent } from './folder-list/components/folder-specification-modal/folder-specification-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    FoldersComponent,
    FolderListComponent,
    FolderDetailsComponent,
    AddFolderModalComponent,
    FolderSpecificationModalComponent,
    
  ],
  imports: [
    CommonModule,
    FoldersRoutingModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class FoldersModule { }
