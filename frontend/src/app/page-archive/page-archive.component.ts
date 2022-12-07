import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-page-archive',
  templateUrl: './page-archive.component.html',
  styleUrls: ['./page-archive.component.scss']
})
export class PageArchiveComponent implements OnInit {

  userEditForm : FormGroup;
  showForm = false; 
  p: number= 1;
  itemsperpage: number= 5;
  totalUser:any; 
  searchText:any;
   userArchive:any =[];
   user: any;
  constructor(private userService : UserService, private formBuilder : FormBuilder){
    this.userEditForm = this.formBuilder.group({
      id:[''],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

ngOnInit(): void {

  this.userService.GetUsers().subscribe( 
      data =>{

        this.user = data;
        this.userArchive = this.user.filter((e:any)=> e.etat == true)
               console.log(this.userArchive)
              }
);

}




dearchiveUser=(id:any,etat:any)=> {

  etat == true ? etat = false : etat = true

   const user ={
   etat : etat

   }

   this.userService.updateUser(id,user).subscribe(

    data=>{
      this.ngOnInit();
    }
   );
}

}