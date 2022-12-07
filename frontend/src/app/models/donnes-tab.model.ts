export class User{
    _id?: any;
    prenom!:string;
    nom!:string;
    email!:string;
    role!:String;
    imageUrl!:String;
    tel!:number;
    password!:String | Number;
    passwordConfirm!: String | Number;
    etat?:boolean
}
