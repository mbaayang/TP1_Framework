import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { monTab } from 'src/app/models/donnes-tab.model';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  registerForm!:FormGroup;
  title = 'angularvalidate';

    users!: monTab 

  submitted=false;

  constructor(private formBuilder:FormBuilder,
              private userService: UserServices ){

  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      nom:['',[Validators.required,Validators.minLength(4)]],
      prenom:['',Validators.required],
      role:['',Validators.required],
      photo:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      
    })
  }

   listDeroulant=['admin','user'];

  onSubmit(){
    this.submitted = true
    
    if(this.registerForm.invalid){
      return 
    }
    alert("Success")
  }


  saveUsers(): void {
    const data = {
      prenom: this.registerForm.value.prenom,
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role,
      imageUrl: this.registerForm.value.imageUrl,
      // tel: this.registerForm.value.tel,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.passwordConfirm
    }
console.log(data)
    // this.UserService.createUser(data)
    // .subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.submitted = true;
    //   },
    //   error: (e) => console.error(e)
    // });
    this.userService.addUser(data).subscribe(
      data =>{
        console.log(data)
      }
    )
  } 




}