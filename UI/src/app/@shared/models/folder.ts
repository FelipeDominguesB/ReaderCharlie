import {ObjectId} from 'mongodb';
import { File } from './file';

export interface Folder{
    _id: ObjectId,
    name: string,
    size: number,
    files: Array<File>
}