import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
imageUrl!:string;

  ngOnInit() {
    this.imageUrl='../assets/default-avatar.jpg';
  }

}
