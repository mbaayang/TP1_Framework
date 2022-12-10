import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  signupForm: FormGroup;
  submitted=false;
  check= false;
  confirm=false;
  verifPass:any = true;

  constructor(public formBuilder: FormBuilder,
              public authService: AuthService,
              public router: Router
  ) {
    this.signupForm = this.formBuilder.group({
        prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],
        etat:[0, Validators.required],
        imageUrl:['']
    });
  }

  listDeroulant=['Administrateur','Utilisateur'];

  ngOnInit() {}


  registerUser() {

    this.submitted = true;
    let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;
    if( pass1 !== pass2)
    {
      this.verifPass = false;
      this.signupForm = this.formBuilder.group(
        {password:[''],passwordConfirm:['']}
      )
      setTimeout(()=>{ this.verifPass = true}, 5000);
    }

    if(this.signupForm.invalid)
    {
      return;
    }else
    {
      this.authService.signUp(this.signupForm.value).subscribe((res) => {
        console.log(res)
        if (res.message == 'User successfully created!') {
          this.confirm=true;
         // setTimeout(()=>{ res.message == 'User successfully created!'}, 5000);
          // this.signupForm.reset();
          // this.router.navigate([]);
          window.location.reload();
          Swal.fire('Inscription réussie !');
        }
      });
    }
   
  }

/* Vider les champs apres envoie */
/*
    clearForm()
    {

      if(this.confirm==false)
      {
        this.signupForm = this.formBuilder.group(
          {
            password:[''],
            passwordConfirm:[''],
            prenom:[''],
            nom:[''],
            email:[''],
            role:['']
  
          })
      }
       let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
      let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;

      let nm = (<HTMLInputElement>document.getElementById("nm")).value;
      let pnom = (<HTMLInputElement>document.getElementById("prn")).value;

      let em = (<HTMLInputElement>document.getElementById("em")).value;
      let rle = (<HTMLInputElement>document.getElementById("rle")).value;
     

      
      
    }
 */
}
