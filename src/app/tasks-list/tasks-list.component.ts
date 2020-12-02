import { Component, OnInit } from '@angular/core';
import { GroupTaskService } from '../group-list/group-task.service';
import { TaskGroup } from '../group-list/grouptask.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {

  group: TaskGroup;

  constructor(private groupTaskService: GroupTaskService, private taskService: TaskService) { }

  ngOnInit(): void {
    // The event to get the chosen group to display
    this.groupTaskService.chosenGroupEvent.subscribe((newGroup: TaskGroup) => this.group = newGroup);
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
