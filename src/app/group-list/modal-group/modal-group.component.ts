import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupTaskService } from '../group-task.service';
import { TaskGroup } from '../grouptask.model';

@Component({
  selector: 'app-modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.css']
})
export class ModalGroupComponent implements OnInit{

  group: TaskGroup;
  nameError = false;
  constructor(private modalService: NgbModal, private groupTaskService: GroupTaskService, private renderer: Renderer2 ) { }

  ngOnInit(): void {}

  open(content): void {
    this.modalService.open(content);
  }

  addInput(something: ElementRef): void {
    const input = document.createElement('input');
    // input.style.marginRight = '20px';
    // input.style.marginTop = '10px';
    const inputArea = document.querySelector('#itemsinput');
    input.classList.add('subGroupInput');
    input.style.marginLeft = '167px';
    input.style.marginBottom = '20px';
    inputArea.appendChild(input);
    // something.nativeElement.appendChild(input);
  }

  submit(content, form): void {
    const newGroup: TaskGroup = {name: '', tasks: [], items: []};
    const newName = form.querySelector('#groupName');
    newGroup.name = newName.value;
    const itemsArr: string[] = [];
    for (const item of form.querySelector('#itemsinput').childNodes) {
      itemsArr.push(item.value);
    }
    newGroup.items = [...itemsArr];
    if (this.groupTaskService.inputValidationGroup(newGroup)) {
      this.group = newGroup;
      this.groupTaskService.addGroup(this.group);
      this.modalService.dismissAll();
    }
    else {
      console.log('nameError');
      this.nameError = true;
    }

  }

}
