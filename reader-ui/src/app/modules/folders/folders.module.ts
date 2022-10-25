import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersComponent } from './folders.component';
import { FoldersRoutingModule } from './folders-routing.module';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    FoldersComponent,
    FolderListComponent,
    FolderDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    FoldersRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class FoldersModule { }
