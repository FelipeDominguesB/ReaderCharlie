import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Folder } from '../../@shared/models/folder';
import { File } from '../../@shared/models/file';
import { CommandStartedEvent, ObjectId } from 'mongodb';
@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:8000/'
  fetchAllFolders() : Observable<Folder[]>
  {
    return this.http.get<Folder[]>(this.serverUrl + 'folders');
    
  }

  fetchFolderFiles(FolderId: ObjectId) : Observable<Folder>
  {
      return this.http.get<Folder>(this.serverUrl + 'folders/' + FolderId);
      
  }

  createFolder(folderName?: string | null)
  {

    if(folderName == null || folderName == undefined)
    {
      
      folderName = 'Teste de folder vazio';
    }

    var requestOptions = { headers: {
      "Content-Type": "application/json"
    }}
    return this.http.post<any>( this.serverUrl + 'folder', { name: folderName }, requestOptions);
  }

  uploadFilesToFolder(folderId: ObjectId, files: FileList)
  {
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));
      
     
      return this.http.post<any>(this.serverUrl + 'folder/' + folderId + '/files', formData);
  }
}
