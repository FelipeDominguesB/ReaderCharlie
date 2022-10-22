import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseFoldersService } from 'src/app/@core/services/firebase-folders.service';
import { FileInfo } from 'src/app/@shared/models/file';
import { Folder } from 'src/app/@shared/models/folder';


@Component({
    selector: 'app-folder-details',
    templateUrl: './folder-details.component.html',
    styleUrls: ['./folder-details.component.scss']

})
export class FolderDetailsComponent implements OnInit {

    folderFiles: FileInfo[] = [];
    constructor(private route: ActivatedRoute, private folderServices: FirebaseFoldersService) {
        this.route.params.subscribe(params => {
            this.folderServices.getFolderByKey(params['id']).subscribe(folderList => {
                this.folderFiles = folderList[0].files;
                console.log(folderList);
            });
        });
    }



    ngOnInit(): void {

    }


}
