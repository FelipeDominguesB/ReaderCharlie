import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileInfo } from 'src/app/@shared/models/file';
import { Folder } from 'src/app/@shared/models/folder';
import { Observable, of, pipe} from 'rxjs';
import { finalize, map, first, take } from 'rxjs/operators';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FolderDetailsComponent } from 'src/app/modules/folders/folder-details/folder-details.component';
import { ThrowStmt } from '@angular/compiler';
import { UserProperties } from 'src/app/@shared/models/User';
@Injectable({
    providedIn: 'root'
})
export class FirebaseFoldersService {

    folderRef: AngularFireList<Folder>
    userId: string;
    constructor(private storage: AngularFireStorage, private database: AngularFireDatabase, private authService: FirebaseAuthenticationService) {}

    createFolder(folderName: string) 
    {
        const folderReference = this.database.list("folders");
        const uid = this.authService.userId;
        let folder = new Folder(folderName, uid);
        folderReference.push(folder);
    }

    
    addFileToFolder(file: FileInfo, folderKey: string)
    {   
        const folderRef = this.database.list<FileInfo>("folders/" + folderKey + "/files");
        folderRef.push(file);
    }


    getUserFolders()
    {
        const uid = this.authService.userId;
        const folderListRef = this.database.list<Folder>("folders", ref => ref.orderByChild('userId').equalTo(uid));
        return folderListRef.snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    getFolderFiles(folderKey: string)
    {

        let folderFiles: FileInfo[] = [];
        const folderFilesObject = this.database.list<FileInfo>(`folders/${folderKey}/files`);

        return folderFilesObject.valueChanges();

   
    }
    deleteFolder(folder: Folder)
    {
        const folderObject = this.database.list<Folder>("folders");
        
        if(folder.files)
        {
            Object.values(folder.files).forEach(file =>{
                this.removeFile(folder.key, file.fileName);       
            })
        }
        
        folderObject.remove(folder.key);

    }

    removeFile(folderKey, fileName)
    {
        let storageRef = this.storage.storage.ref(`/${folderKey}/${fileName}`);
        storageRef.delete();
    }
    
    uploadFiles(files: File[], folderKey: string) 
    {
        [...files].forEach(file => {
            this.pushFileToStorage(file, folderKey).subscribe(res =>{
                console.log(file.name + ' - ' + res);
            });
        });
    }

    pushFileToStorage(file: File, folderKey: string){
        let fileName = Date.now() + '-' + file.name;
        let folderComposeName = `/${folderKey}/`
        let path = folderComposeName + fileName;
        const storageRef = this.storage.ref(path);
        const uploadTask = this.storage.upload(path, file);
      
        
        uploadTask.snapshotChanges().pipe(
            finalize(() => 
            {
                storageRef.getDownloadURL().subscribe(downloadURL => 
                {
                    let fileInfo = new FileInfo();
                    fileInfo.fileDownloadUrl = downloadURL;
                    fileInfo.fileName = fileName;
                    this.addFileToFolder(fileInfo, folderKey);
                })
            })
        ).subscribe();
      
        return uploadTask.percentageChanges();
    }

    getFolderByKey(folderKey: string)
    {
        return this.database.list<Folder>("folders", ref => ref.orderByKey().equalTo(folderKey).limitToFirst(1)).valueChanges();
    }

}
