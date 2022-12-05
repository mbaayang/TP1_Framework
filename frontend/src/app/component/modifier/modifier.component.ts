import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(private UserService: UserService,public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute) {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.UserService.GetUser(this.getId).subscribe(res => {
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

  onUpdate(): any {
    this.UserService.updateUser(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Modification réussie !')
        this.ngZone.run(() => this.router.navigateByUrl('/Users'))
      }, (err) => {
        console.log(err);
    });


  }

}
