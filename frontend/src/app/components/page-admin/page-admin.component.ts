import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
  currentUser: any = {};
  updateForm: FormGroup;
  submitted=false;
  formPassword: Boolean = false;
  formImage: Boolean = false;
  show:boolean = false;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
     // Recuperer les informations de l'utilisateur
    /* let id = this.actRoute.snapshot.paramMap.get('id'); */
    let id = localStorage.getItem('id')?.replaceAll('"', '');
    console.log(id);

    this.authService.getUserProfile(id).subscribe((res) => {
      console.log(res);

      this.currentUser = res.msg;
    });

    this.updateForm = this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    })
  }

  ngOnInit(): void {}
  //Deconnexion
  logout() {
    this.authService.doLogout()
  }

  onUpdate(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    const user ={
    password: this.updateForm.value.password,
   }
   this.submitted = true;
   if(this.updateForm.invalid){
     return;
   }
      this.authService.updatepass(id, user).subscribe(
        data=>{
          /* Swal.fire('Modification réussie !'); */
          /* setTimeout(()=>{Swal.fire('Modification réussie !')}, 5000); */
          Swal.fire('Modification réussie !');
          window.location.reload();
        });
    }
  // Fonctions pour basculer entre le tableau des actifs et celui des archives
  public afficher():void{
    this.show = true
  }

  public afficher1():void{
    this.show = false
  }

  showPassword(){
    return this.formPassword = true;
  }
  hidePassword(){
    return this.formPassword = false;
  }

  showImage(){
    return this.formImage = true;
  }
  hideImage(){
    return this.formImage = false;
  }
}
