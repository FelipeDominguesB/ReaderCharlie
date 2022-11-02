export class User{
    constructor() {}

    uid: string;
    email: string;
    createdAt?: string;
    displayName: string;
    photoURL?: string | null;


}

export enum UserProperties{
    Email = "email",
    DisplayName = "displayName",
    PhotoUrl = "photoUrl",
    Uid = "uid"
}

export interface UserRegistryObject{
    email: string;
    password: string;
    displayName: string;
    photoURL?: string | null;


}
