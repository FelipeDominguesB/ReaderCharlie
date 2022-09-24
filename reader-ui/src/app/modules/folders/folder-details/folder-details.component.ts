import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongodb';
import { File } from 'src/app/@shared/models/file';
import { FoldersService } from 'src/app/@core/services/folders.service';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',

})
export class FolderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private folderService: FoldersService) { }
  folderId: ObjectId | null = null;
  folderFiles: File[] = [];
  filePath = 'http://localhost:8000/downloads/';
  
  ngOnInit(): void {
      this.route.params.subscribe(params =>{
          this.folderId = params['id'];
          this.fetchFolderFiles();
      });
      
  }

  fetchFolderFiles()
  {
      if(this.folderId)
      {
          this.folderService.fetchFolderFiles(this.folderId).subscribe(folder =>{
              this.folderFiles = folder.files;
          });   
      }
  }

}
