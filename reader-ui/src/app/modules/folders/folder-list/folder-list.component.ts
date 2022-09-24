import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoldersService } from 'src/app/@core/services/folders.service';
import { Folder } from 'src/app/@shared/models/folder';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {

  constructor(private folderService: FoldersService, private route: ActivatedRoute, private router: Router) { }
  folders: Folder[] = [];
  
  showDetails: boolean = false;
  selectedFolder?: Folder;
  ngOnInit(): void {
    this.loadFolders();
    
  }


  loadFolders()
  {
    this.folderService.fetchAllFolders().subscribe(folders =>{
      this.folders = folders;
    });
  }
  selectFolder(folder: Folder)
  {
    
      this.selectedFolder = folder;
  }

  showFolderDetails()
  {
      this.showDetails = true;
      this.router.navigate(['/folders', this.selectedFolder?._id]);

  }
  addFolder()
  {
      let folderName = prompt("Informe o nome da pasta");
      this.folderService.createFolder(folderName).subscribe();
      this.loadFolders()
  }

  
  addFiles(event: any)
  {
      if(this.selectedFolder == null || this.selectedFolder == undefined) 
      {
        alert("Necessário selecionar uma pasta antes de adicionar arquivos")
        return;
      }
      let fileList = event.target.files;
      this.folderService.uploadFilesToFolder(this.selectedFolder._id, fileList).subscribe();

  }

}
