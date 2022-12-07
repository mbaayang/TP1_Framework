import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  filterTerm!: string;
  Users:any = [];

  totalLenght: any;
  page : number=1;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.GetUsers().subscribe( 
      data =>{

        this.Users = data;
        this.changeArchive = this.Users.filter((e:any)=> e.etat == false)
               console.log(this.changeArchive)
              }
);
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Êtes-vous sûre de vouloir supprimer?')) {
      this.UserService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      })
    }
  };


  changeRole=(id:any,role:any)=> {
    role == "Administrateur" ? role ="Utilisateur": role = "Administrateur"

    const user ={
     role : role
    }

    this.UserService.updateUser(id,user).subscribe(

      data=>{
        this.ngOnInit();
      });
   }

   changeArchive=(id:any,etat:any)=> {
    etat == false ? etat =true: etat = false

    const user ={
     etat : etat
    }

    this.UserService.updateUser(id,user).subscribe(

      data=>{
        this.ngOnInit();
      });
   }

}



