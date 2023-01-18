import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = {};
  Users:any = [];
  user:any;
  emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    /* let id = this.actRoute.snapshot.paramMap.get('id'); */
    let id = localStorage.getItem('id')?.replaceAll('"', '');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });


  }


  ngOnInit() {
    this.authService.GetUsers().subscribe(
      data =>{

        this.user = data;
        this.Users = this.user.filter((e:any)=> e.etat == false)
          console.log(this.Users)
        }
    );
}
}
