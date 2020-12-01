import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // The function to highlight the selected category
  onClick(ev: any): void {
    console.log(ev.target.parentNode.children);
    for (const child of ev.target.parentNode.children) {
      child.classList.remove('li-active');
    }
    ev.target.classList.add('li-active');
  }

}
