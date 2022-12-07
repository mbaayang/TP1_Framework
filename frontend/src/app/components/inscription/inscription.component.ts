import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
        prenom:['',Validators.required],
        nom:['',[Validators.required,Validators.minLength(4)]],
        email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        etat:[0, Validators.required],
        photo:['',Validators.required],
    });
  }
  listDeroulant=['Admin','User'];
  ngOnInit() {}

  submitted=false;

  onSubmite(){
    this.submitted = true;

    if(this.signupForm.invalid){
      return;
    }
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate([]);
        Swal.fire('Modification réussie !');
      }
    });
  }

}
