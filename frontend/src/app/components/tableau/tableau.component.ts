import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {
  currentUser: any = {};

  filterTerm!: string;

  Users:any = [];
  user:any;
  totalLenght: any;
  page : number=1;
  updateForm: FormGroup;
  submitted=false;


  constructor(public authService: AuthService,private activatedRoute: ActivatedRoute,private router: Router,private ngZone: NgZone,public formBuilder: FormBuilder) {
    /* let id = this.activatedRoute.snapshot.paramMap.get('id'); */
    let id = localStorage.getItem('id')?.replaceAll('"', '');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });



    this.updateForm = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, UsernameValidator.cannotContainSpace]]
    })

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

// Modification des rôles l'utilisateur entre Administrateur et Utilisateur
  changeRole=(id:any,role:any)=> {
    role == "Administrateur" ? role = "Utilisateur": role = "Administrateur"
    const user ={
     role : role
    }
    this.authService.updateUser(id,user).subscribe(
      data=>{
        this.ngOnInit();
      });
   }

// Modification des etats de l'utilisateur entre true et false
   archiver=(id:any,etat:any)=> {
    etat == false ? etat =true: etat = false
    const user ={
     etat : etat
    }
    Swal.fire({
      title: 'Archivage',
      text: 'Êtes-vous sûre de vouloir archiver ?',
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

// Récupération du prénom, du nom et de l'email d'un utilisateur

   getUserData(id:any,prenom:any,nom:any,email:any){

    this.updateForm = this.formBuilder.group({
        id:[id],
        prenom: [prenom, [Validators.required]],
        nom: [nom, [Validators.required]],
        email: [email, [Validators.required]],
      });
    console.log(id)
  }

// Modification du prénom, du nom ou de l'email d'un utilisateur

onUpdate(){
  const id =  this.updateForm.value.id;
  const user ={
  prenom: this.updateForm.value.prenom,
  nom : this.updateForm.value.nom,
  email: this.updateForm.value.email
 }
 this.submitted = true;
 if(this.updateForm.invalid){
   return;
 }
    this.authService.updateUser(id, user).subscribe(
      data=>{
        this.ngOnInit();
        /* Swal.fire('Modification réussie !'); */
        /* setTimeout(()=>{Swal.fire('Modification réussie !')}, 5000); */
        Swal.fire('Modification réussie !');
        window.location.reload();
      });
  }

  }
