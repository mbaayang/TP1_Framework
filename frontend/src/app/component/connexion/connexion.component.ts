
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  registerForm!:FormGroup
  title = 'angularvalidate';
  submitted=false

  constructor(private formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
     
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    }) }
    onSubmit() {
      this.submitted = true
      
      if(this.registerForm.invalid){
        return
      }
    }
  }