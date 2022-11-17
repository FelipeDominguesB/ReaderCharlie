import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { FirebaseFoldersService } from 'src/app/@core/services/firebase-folders.service';
import { FileInfo } from 'src/app/@shared/models/file';
import { Folder } from 'src/app/@shared/models/folder';
import { AddFolderModalComponent } from './components/add-folder-modal/add-folder-modal.component';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthenticationService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private firebaseFolderService: FirebaseFoldersService,
    public dialog: MatDialog) { }
  folders: any[] = [];

  showPublicFolders: boolean = false;

  showDetails: boolean = false;
  selectedFolder?: Folder;
  ngOnInit(): void {
      this.showPublicFolders = this.router.url.includes('public');
      this.loadFolders();
  }


  loadFolders() : void
  {
    if(this.showPublicFolders)
    {
      this.firebaseFolderService.getAllPublicFolders().subscribe(folderList =>{
        this.folders = folderList;
        console.log(this.folders);
      });
    }
    else{
      this.firebaseFolderService.getUserFolders().subscribe(folderList =>{
        this.folders = folderList;
        console.log(this.folders);
      });
    }

    console.log(this.folders);
    
  }

  selectFolder(folder: Folder | undefined)
  {

     this.selectedFolder = folder;
      
  }

  showFolderDetails()
  {
      this.showDetails = true;
      // this.router.navigate(['/folders', this.selectedFolder?._id]);

  }
  addFolder()
  {

      const dialogRef = this.dialog.open(AddFolderModalComponent, {
        width: '600px'
      })

      dialogRef.afterClosed().subscribe({
        next: (response) =>{
          if(!!response)
            this.firebaseFolderService.createFolder(response.folderName, response.isPublic, response.isAgeRestricted)
        }
      });

  }

  deleteFolder(folder: Folder)
  {
      this.firebaseFolderService.deleteFolder(folder)
  }
  addFiles(event: any)
  {

      if(this.selectedFolder == null || this.selectedFolder == undefined) 
      {
        alert("Necessário selecionar uma pasta antes de adicionar arquivos")
        return;
      }

      let fileList: File[] = [];

      fileList = event.target.files;
      this.firebaseFolderService.uploadFiles(fileList, this.selectedFolder.key);
      this.selectedFolder = undefined
  
  }
}
