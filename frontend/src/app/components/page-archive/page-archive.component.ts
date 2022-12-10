import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-archive',
  templateUrl: './page-archive.component.html',
  styleUrls: ['./page-archive.component.scss']
})
export class PageArchiveComponent implements OnInit {

  filterTerm!: string;
  totalLenght: any;
  page: number= 1;
  userArchive:any =[];
  user: any;
  currentUser: any = {};

  constructor(private authService : AuthService, 
              private actRoute: ActivatedRoute,
              private formBuilder : FormBuilder){
                let id = this.actRoute.snapshot.paramMap.get('id');
                this.authService.getUserProfile(id).subscribe((res) => {
                  this.currentUser = res.msg;
                });
  }

ngOnInit(): void {
  this.authService.GetUsers().subscribe( 
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
   Swal.fire({
    title: 'Désarchiver',
    text: 'Êtes-vous sûre de vouloir désarchiver?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
   this.authService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    });
  }else if (result.dismiss === Swal.DismissReason.cancel) {
  }
});
}

}