import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { FirebaseFoldersService } from 'src/app/@core/services/firebase-folders.service';
import { FileInfo } from 'src/app/@shared/models/file';
import { Folder } from 'src/app/@shared/models/folder';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthenticationService, private route: ActivatedRoute, private router: Router, private firebaseFolderService: FirebaseFoldersService) { }
  folders: any[] = [];
  
  showDetails: boolean = false;
  selectedFolder?: Folder;
  ngOnInit(): void {
      this.loadFolders();
  }


  loadFolders() : void
  {
    this.firebaseFolderService.getUserFolders().subscribe(folderList =>{
        this.folders = folderList;
    });
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
      let folderName = prompt("Informe o nome da pasta");
      
      if(folderName == null || folderName == undefined || folderName?.trim() == "")
      {
          alert("Necessário informar um nome!");
          return;
      }

      this.firebaseFolderService.createFolder(folderName);
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
