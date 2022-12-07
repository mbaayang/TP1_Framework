import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


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
    this.UserService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });
  }
  delete(id:any, i:any) {
    console.log(id);
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes-vous sûre de vouloir supprimer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.UserService.deleteUser(id).subscribe((res) => {
          this.Users.splice(i, 1);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
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



