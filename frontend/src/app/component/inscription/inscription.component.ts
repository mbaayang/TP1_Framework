import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  registerForm!: FormGroup;
  title = 'angularvalidate';



  submitted=false;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private UserService: UserService ){
      this.registerForm = this.formBuilder.group({
        prenom:['',Validators.required],
        nom:['',[Validators.required,Validators.minLength(4)]],
        email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        photo:['',Validators.required],


      })

  }
  listDeroulant=['admin','user'];

  ngOnInit(){

  }



  /* onSubmit(){
    this.submitted = true

    if(this.registerForm.invalid){
      return
    }
    alert("Success")
  }*/


  /* saveUsers(): void {
    const data = {
      prenom: this.registerForm.value.prenom,
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      role: this.registerForm.value.role,
      imageUrl: this.registerForm.value.imageUrl,
      // tel: this.registerForm.value.tel,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.passwordConfirm
    } */
    // this.UserService.createUser(data)
    // .subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.submitted = true;
    //   },
    //   error: (e) => console.error(e)
    // });
    /* this.userService.addUser(data).subscribe(
      data =>{
        console.log(data)
      }
    )
  } */

  onSubmit(): any {
    this.UserService.AddUser(this.registerForm.value)
    .subscribe(() => {
        console.log('Inscription réussie !')
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }, (err) => {
        console.log(err);
    });
  }




}
