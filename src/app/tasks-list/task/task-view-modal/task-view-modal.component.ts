import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskGroup } from 'src/app/group-list/grouptask.model';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-view-modal',
  templateUrl: './task-view-modal.component.html',
  styleUrls: ['./task-view-modal.component.css']
})
export class TaskViewModalComponent implements OnInit {

  @Input() task: Task;

  @ViewChild('taskviewmodal') content;

  constructor(private modalService: NgbModal, private taskService: TaskService) { }

  ngOnInit(): void {
    // The event to open the modal
    this.taskService.viewTask.subscribe(
      (task: Task) => this.open(task)
    );
  }

  // The function to open the modal
  open(task: Task): void {
    this.task = task;
    console.log(this.task);
    this.modalService.open(this.content);
  }

  // The function of the user deletes the task
  deleteTask(): void {
    this.taskService.deleteTask(this.task);
    this.modalService.dismissAll();
  }

}
