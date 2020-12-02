import { Component, Input, OnInit } from '@angular/core';
import { TaskGroup } from '../group-list/grouptask.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Who is active right now
  isActive = 'home';

  constructor() { }

  ngOnInit(): void {
  }

  // The function to get which sidebar icon is active
  onClick(ev: any): void {
    if ( ev.target.classList.contains('home') ) {
      this.isActive = 'home';
    } else if ( ev.target.classList.contains('tasks') ) {
      this.isActive = 'tasks';
    }
  }

}
