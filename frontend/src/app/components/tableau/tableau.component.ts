import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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


  constructor(public authService: AuthService,private activatedRoute: ActivatedRoute,private router: Router,private ngZone: NgZone,public formBuilder: FormBuilder) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });

    

    this.updateForm = this.formBuilder.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]]
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


  changeRole=(id:any,role:any)=> {
    role == "Administrateur" ? role ="Utilisateur": role = "Administrateur"
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

   getUserData(id:any,prenom:any,nom:any,email:any){

    this.updateForm = this.formBuilder.group({
        id:[id],
        prenom: [prenom, [Validators.required]],
        nom: [nom, [Validators.required]],
        email: [email, [Validators.required]],
      });
    console.log(id)
  }

   onUpdate(){
    const id =  this.updateForm.value.id;
 const user ={
  prenom: this.updateForm.value.prenom,
  nom : this.updateForm.value.nom,
  email: this.updateForm.value.email
 }
    this.authService.updateUser(id, user).subscribe(
      data=>{
        this.ngOnInit();
        Swal.fire('Modification réussie !');
        setTimeout(()=>{Swal.fire('Modification réussie !')}, 5000);
        window.location.reload();
      });

  }

  }
