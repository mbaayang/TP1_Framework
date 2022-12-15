import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(public authService: AuthService,public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.GetUse(this.getId).subscribe(res => {
      this.updateForm.setValue({
        prenom: res['prenom'],
        nom: res['nom'],
        email: res['email']
      });
    });
    this.updateForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
      email: ['']
    })
     }

  ngOnInit(): void {
  }

  //Fonction pour modifier un utlisateur
  onUpdate(): any {
    this.authService.updateUser(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Modification réussie !')
        this.ngZone.run(() => this.router.navigateByUrl('/user-profile/:id'));
        Swal.fire('Modification réussie !');
      }, (err) => {
        console.log(err);
    });
  }
}
