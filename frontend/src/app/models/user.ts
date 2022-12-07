export interface User{
    id?:any;
    nom? : String;
    prenom?:String;
    email?: String;
    imageUrl?:File;
    role?: String;
    password?:String | Number;
    passwordConfirm?: String | Number;
    etat?:boolean
}
