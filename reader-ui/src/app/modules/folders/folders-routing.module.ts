import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { FolderListComponent } from './folder-list/folder-list.component';



const routes: Routes = [
  { path: '', component: FolderListComponent},
  { path: 'public', component: FolderListComponent},
  { path: ':id', component: FolderDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoldersRoutingModule { }