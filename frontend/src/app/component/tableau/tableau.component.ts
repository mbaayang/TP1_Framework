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

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });
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

}



