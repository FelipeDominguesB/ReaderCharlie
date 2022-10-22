import { FileInfo } from './file';

export class Folder{

    constructor(name: string, userId: string)
    {
        this.name = name;
        this.userId = userId;
        this.files = [];
    }

    name: string;
    userId: string;
    key: string;
    files: Array<FileInfo>;
}