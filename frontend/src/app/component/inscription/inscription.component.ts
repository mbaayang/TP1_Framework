import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  registerForm!:FormGroup;
  title = 'angularvalidate';
/*   message: Boolean = false;
 */
  submitted=false;

  constructor(private formBuilder:FormBuilder,
              private userService: UserServices){

  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      role:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      
    })
  }

   listDeroulant=['admin','user'];

   
   onSubmit(){
    this.submitted = true
    
    if(this.registerForm.invalid){
      return;
    }
  } 


  saveUsers(): void {
    const data = {
      prenom: this.registerForm.value.prenom,
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role,
      imageUrl: this.registerForm.value.imageUrl,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.passwordConfirm
    }

/*     this.message = true; */
    this.registerForm.reset();

     this.userService.addUser(data).subscribe(
      data =>{
        console.log(data);
      }
    ) 
  } 
}