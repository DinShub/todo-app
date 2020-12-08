import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupTaskService } from '../group-task.service';
import { TaskGroup } from '../grouptask.model';

@Component({
  selector: 'app-modal-group-view',
  templateUrl: './modal-group-view.component.html',
  styleUrls: ['./modal-group-view.component.css']
})
export class ModalGroupViewComponent implements OnInit, OnDestroy {

  editSubscription: any;
  group: TaskGroup;
  @ViewChild('editGroup') content;
  nameError = false;

  constructor(private modalService: NgbModal, private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    this.editSubscription = this.groupTaskService.editGroupEvent.subscribe((group: TaskGroup) => this.open(group));
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  open(group: TaskGroup) {
    console.log('open');
    this.group = group;
    this.modalService.open(this.content);
    this.fillInfo();
  }

  fillInfo(): void {
    console.log(this.content.elementRef);
    const name: any = document.querySelector('#groupName');
    name.value = this.group.name;
    for (let i = 1; i < this.group.items.length; i++) {
      const inputArea = document.querySelector('#itemsinput');
      const input = document.createElement('input');
      input.classList.add('subGroupInput');
      input.style.marginLeft = '167px';
      input.style.marginBottom = '20px';
      input.value = this.group.items[i];
      inputArea.appendChild(input);
    }

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

  submit(form): void {
    const newGroup: TaskGroup = {name: '', tasks: [], items: []};
    const newName = form.querySelector('#groupName');
    newGroup.name = newName.value;
    const itemsArr: string[] = [];
    for (const item of form.querySelector('#itemsinput').childNodes) {
      itemsArr.push(item.value);
    }
    newGroup.items = [...itemsArr];
    if (this.groupTaskService.inputValidationGroup(newGroup)) {
      this.group.name = newGroup.name;
      this.group.items = [...itemsArr];
      this.groupTaskService.updateStorage();
      this.modalService.dismissAll();
    } else if (this.group.name === newGroup.name) {
      this.group.items = [...itemsArr];
      this.groupTaskService.updateStorage();
      this.modalService.dismissAll();
    }
    else {
      console.log('nameError');
      this.nameError = true;
    }
  }

}
