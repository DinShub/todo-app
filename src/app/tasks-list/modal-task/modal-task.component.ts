import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupTaskService } from 'src/app/group-list/group-task.service';
import { TaskGroup } from 'src/app/group-list/grouptask.model';
import { Task } from '../task.model';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
})
export class ModalTaskComponent {

  selectedSub: string;
  @Input() group: TaskGroup;

  constructor(private modalService: NgbModal, private groupTaskService: GroupTaskService ) { }

  // The function to open the modal to add a task
  open(content): void {
    if (this.group) {
      this.modalService.open(content);
    }
  }

  // The function to choose the sub group from the dropdown
  chooseSub(item: string): void {
    this.selectedSub = item;
  }

  // Submitting the form
  // Brute coded to take the data from the form
  // When all the data was extracted we call the GroupTaskService to add the task to the group
  submit(form): void {
    const time = new Date();
    const taskName = form.querySelector('#taskName').value;
    const desciprtion = form.querySelector('#description').value;
    this.groupTaskService.addTask(this.group, {name: taskName, date: new Date(), status: 'TODO',
                                               groupName: this.group.name, item: this.selectedSub, description: desciprtion});

    this.modalService.dismissAll();
  }

}
