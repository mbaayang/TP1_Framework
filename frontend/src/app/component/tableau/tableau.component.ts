import { Component, OnInit, Input } from '@angular/core';
import { monTab } from 'src/app/models/donnes-tab.model';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  @Input() tab!: monTab;

  donnees!: monTab[];

  constructor(private UserService: UserServices){}

  
  ngOnInit(){
 this.UserService.getAllDonnes().subscribe((donnee: monTab[])=> {
  this.donnees=[...donnee]
 })

  }
}



