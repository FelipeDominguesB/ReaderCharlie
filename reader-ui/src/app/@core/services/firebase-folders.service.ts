import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileInfo } from 'src/app/@shared/models/file';
import { Folder } from 'src/app/@shared/models/folder';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FolderDetailsComponent } from 'src/app/modules/folders/folder-details/folder-details.component';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
    providedIn: 'root'
})
export class FirebaseFoldersService {

    folderRef: AngularFireList<Folder>
    userId: string;
    constructor(private storage: AngularFireStorage, private database: AngularFireDatabase, private authService: FirebaseAuthenticationService) {
        this.userId = authService.userId;
    }


    createFolder(folderName: string) {
        const folderReference = this.database.list("folders");

        let folder = new Folder(folderName, this.userId);

        folderReference.push(folder);
    }

    getFolders() {
       
    }

    getUserFolders()
    {

        const folderListRef = this.database.list<Folder>("folders", ref => ref.orderByChild('userId').equalTo(this.userId));
        return folderListRef.snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    uploadFile(files: File[], folderKey: string) {

        [...files].forEach(file => {

            let fileName = Date.now() + '-' + file.name;
            let folderComposeName = `/${folderKey}/`
            let path = folderComposeName + fileName;

            const storageRef = this.storage.ref(path);
            const uploadTask = this.storage.upload(path, file);

            uploadTask.snapshotChanges().pipe(
                finalize(() => {
                    storageRef.getDownloadURL().subscribe(downloadURL => {
                        let fileInfo = new FileInfo();
                        fileInfo.fileDownloadUrl = downloadURL;
                        fileInfo.fileName = fileName;
                        this.addFileToFolder(fileInfo, folderKey);
                    });
                })
            ).subscribe();

        });
    }


    addFileToFolder(file: FileInfo, folderKey: string)
    {   
        let fileList: FileInfo[] = [];
        const folderListRef = this.database.list<Folder>("folders", ref => ref.orderByKey().equalTo(folderKey));

        folderListRef.valueChanges().subscribe(res =>{
            if(!res[0].files) res[0].files = [];
            fileList = res[0].files;
            fileList.push(file);

            this.database.list("folders").update(folderKey, {files: fileList});
        });

        
        
    }
}
