import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { monTab } from 'src/app/models/donnes-tab.model';
import { UserServices } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  @Input() tab!: monTab;
  @Input() currentUser!: User;

  donnees!: monTab[];
  totalLenght: any;
  page : number=1;
 
  constructor(private userService: UserServices,
              private route: ActivatedRoute,
              private router: Router){}

  
  ngOnInit(){

 this.userService.getAllUser().subscribe((donnee: monTab[])=> {
  this.donnees=[...donnee]
 })
  }

  deleteUser(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.donnees.splice(i, 1);
      })
    }
  }
}



