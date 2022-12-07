import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{
  registerForm!:FormGroup
  title = 'angularvalidate';
  submitted=false;
  imageUrl!:string;

  constructor(public formBuilder:FormBuilder,
              public userService: UserService,
              public router: Router){

      this.registerForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }
  ngOnInit(){
    this.imageUrl='../assets/default-avatar.jpg';
     }

/*     onSubmit() {
      this.submitted = true
      
      if(this.registerForm.invalid){
        return
      }
    } */
    loginUser() {
      this.userService.signIn(this.registerForm.value);

      this.submitted = true
      
      if(this.registerForm.invalid){
        return
      }
    }
  }
