export class User{
    constructor() {}

    uid: string;
    email: string;
    displayName: string;
    photoURL?: string | null;


}

export enum UserProperties{
    Email = "email",
    DisplayName = "displayName",
    PhotoUrl = "photoUrl",
    Uid = "uid"
}