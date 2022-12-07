import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  filterTerm!: string;

  Users:any = [];
  user:any;
  totalLenght: any;
  page : number=1;

  constructor(public authService: AuthService,private activatedRoute: ActivatedRoute,private router: Router,private ngZone: NgZone) {

     }
  ngOnInit(): void {

    this.authService.GetUsers().subscribe(
      data =>{

        this.user = data;
        this.Users = this.user.filter((e:any)=> e.etat == false)
               console.log(this.Users)
              }
);
  }


  changeRole=(id:any,role:any)=> {
    role == "admin" ? role ="user": role = "admin"

    const user ={
     role : role
    }

    this.authService.updateUser(id,user).subscribe(

      data=>{
        this.ngOnInit();
      });
   }

   changeArchive=(id:any,etat:any)=> {
    etat == false ? etat =true: etat = false
    const user ={
     etat : etat
    }
    Swal.fire({
      title: 'Archivage',
      text: 'Êtes-vous sûre de vouloir archiver?',
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
    })
   }


  }
