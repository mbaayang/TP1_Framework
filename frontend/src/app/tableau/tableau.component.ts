import { Component, OnInit, Input } from '@angular/core';
import { monTab } from '../models/donnes-tab.model';
import { UserServices } from '../services/user.service';

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
    this.donnees = this.UserService.getAllDonnes();
  };
}



