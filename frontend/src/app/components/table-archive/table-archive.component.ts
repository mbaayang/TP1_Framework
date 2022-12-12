import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-table-archive',
  templateUrl: './table-archive.component.html',
  styleUrls: ['./table-archive.component.scss']
})
export class TableArchiveComponent {


  filterTerm!: string;

  Users:any = [];
  user:any;
  totalLenght: any;
  page : number=1;

  constructor(public authService: AuthService, private formBuilder : FormBuilder){

  }

ngOnInit(): void {

  this.authService.GetUsers().subscribe(
      data =>{

        this.user = data;
        this.Users= this.user.filter((e:any)=> e.etat == true)
               console.log(this.Users)
              }
);

}

dearchiveUser=(id:any,etat:any)=> {

  etat == true ? etat = false : etat = true

   const user ={
   etat : etat
   }
   this.authService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    }
   );
}

}
