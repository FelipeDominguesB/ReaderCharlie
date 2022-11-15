import { FileInfo } from './file';

export class Folder{

    constructor(name: string, userId: string, isPublic: boolean = false, isAgeRestricted: boolean = true)
    {
        this.name = name;
        this.userId = userId;
        this.files = [];
        this.isPublic = isPublic;
        this.isAgeRestricted = isAgeRestricted;

    }

    name: string;
    userId: string;
    key: string;
    isPublic: boolean;
    isAgeRestricted: boolean;
    files: Array<FileInfo>;
}