import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
})
export class ModalTaskComponent {

  constructor(private modalService: NgbModal ) { }

  // The function to open the modal to add a task
  open(content): void {
    this.modalService.open(content);
  }

}
