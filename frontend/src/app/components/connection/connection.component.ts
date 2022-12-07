import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  signinForm: FormGroup;
  submitted=false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.submitted = true

    if(this.signinForm.invalid){
      return
    }
    /* alert("Success") */
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }

}
