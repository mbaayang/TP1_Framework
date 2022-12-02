export interface User{ 
    nom? : String;
    prenom?:String;
    email?: String;
    role?: String;
    imageUrl?:any;
    password?:String | Number;
    passwordConfirm?: String | Number;

}