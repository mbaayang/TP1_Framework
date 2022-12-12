import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {

  filterTerm!: string;

  Users:any = [];
  user:any;
  totalLenght: any;
  page : number=1;


  constructor(public authService: AuthService){}

  ngOnInit(): void {

    this.authService.GetUsers().subscribe(
      data =>{

        this.user = data;
        this.Users = this.user.filter((e:any)=> e.etat == false)
          console.log(this.Users)
        }
    );
  }
}
