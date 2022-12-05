import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


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

  onSubmite(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }

      Swal.fire('INSCRIPTION REUSSIE');

  }

  onSubmit(): any {
    this.UserService.AddUser(this.registerForm.value)
    .subscribe(() => {
        console.log('Inscription réussie !')
        /* this.ngZone.run(() => this.router.navigateByUrl('/')) */
      }, (err) => {
        console.log(err);
    });
  }




}
