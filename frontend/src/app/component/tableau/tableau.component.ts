import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  filterTerm!: string;

  Users:any = [];

  constructor(private UserService: UserService,private activatedRoute: ActivatedRoute,private router: Router,private ngZone: NgZone) {

     }
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
    role == "Admin" ? role ="User": role = "Admin"

    const user ={
     role : role
    }

    this.UserService.updateUser(id,user).subscribe(

      data=>{
        this.ngOnInit();
      });
   }


}



