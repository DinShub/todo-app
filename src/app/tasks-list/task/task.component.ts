import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskGroup } from 'src/app/group-list/grouptask.model';

import { Task } from '../task.model';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  // The function to open the modal with the task information
  viewTask(ev): void {
    console.log(ev);
    if (ev.target.tagName !== 'A' ) {
      this.taskService.openTask(this.task);
     }
  }

  // The function to give the status the class based on his status
  getStatus(): string {
    return this.task.status;
  }

  // The function to change a task from TODO to doing
  startTask(): void {
    this.task.status = 'doing';
    this.taskService.updateTask(this.task);
  }

  // The function to change a task from doing to finished
  finishTask(): void {
    this.task.status = 'done';
    this.taskService.updateTask(this.task);
  }

}
