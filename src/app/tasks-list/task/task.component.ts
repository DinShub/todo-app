import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GroupTaskService } from 'src/app/group-list/group-task.service';
import { TaskGroup } from 'src/app/group-list/grouptask.model';

import { Task } from '../task.model';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  selectedItem = true;
  subscription: any;

  constructor(private taskService: TaskService, private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    this.subscription = this.groupTaskService.chosenItemEvent.subscribe(() => this.checkSelection());
    this.checkSelection();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // The function to open the modal with the task information
  viewTask(ev): void {
    console.log(ev);
    if (ev.target.tagName !== 'A' && this.task) {
      console.log('open modal');
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

  checkSelection(): void {
    console.log(`item is ${this.groupTaskService.getItem()} task item is ${this.task.item}`);
    this.selectedItem = (this.groupTaskService.getItem() === this.task.item || this.groupTaskService.getItem() === '');
  }

}
