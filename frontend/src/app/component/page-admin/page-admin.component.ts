import { Component, Input , OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
  @Input() currentUser!: User;
  message = '';

  constructor(
    private userService: UserServices,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
  }

  updateUser(): void {
    this.message = '';

    this.userService.updateUser(this.currentUser.id, this.currentUser)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'User modifié avec succée !';
      },
      error: (e) => console.error(e)
    });
  }
}