import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { UsernameValidator } from 'src/app/username.validator';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  registerForm!: FormGroup;
  title = 'angularvalidate';

  submitted=false;
  check= false;
  verifPass:any = true;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService ){

      this.registerForm = this.formBuilder.group({
        prenom:['',Validators.required, UsernameValidator.cannotContainSpace],
        nom:['',Validators.required, UsernameValidator.cannotContainSpace],
        email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        passwordConfirm:['', Validators.required]
      })

  }
  listDeroulant=['Administrateur','Utilisateur'];

  checkPassword=()=>{
    
    let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;

    console.log(pass1 != pass2)
   
    if( pass1 != pass2)
    {
      this.verifPass = false;
      this.registerForm = this.formBuilder.group(
        {
       
        password:[''],
        passwordConfirm:[''],
        
      })

      setTimeout(()=>{ this.verifPass = true}, 3000);
    }
 }

  ngOnInit(){

  }


  onSubmit(): any {
    this.userService.AddUser(this.registerForm.value)
    .subscribe(() => {
        console.log('Inscription réussie !')
        this.ngZone.run(() => this.router.navigateByUrl('/inscriptionUser'))
      }, (err) => {
        console.log(err);
    });
    this.registerForm.reset();
  }

  submitForm(){
    this.submitted = true
    
    if(this.registerForm.invalid){
      return;
    }
  }  

}
