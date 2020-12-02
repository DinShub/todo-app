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

  colors: string[] = [];

  group: TaskGroup;

  color = '';

  constructor(private modalService: NgbModal, private groupTaskService: GroupTaskService, private renderer: Renderer2 ) { }

  ngOnInit(): void {
    this.colors = this.groupTaskService.getColors();
  }

  open(content): void {
    this.modalService.open(content);
  }

  test(something: ElementRef): void {
    const input = document.createElement('input');
    // input.style.marginRight = '20px';
    // input.style.marginTop = '10px';
    const inputArea = document.querySelector('#itemsinput');
    input.classList.add('subGroupInput');
    input.style.marginLeft = '167px';
    input.style.marginBottom = "20px";
    inputArea.appendChild(input);
    // something.nativeElement.appendChild(input);
  }

  chooseColor(color: string): void {
    this.color = color;
  }

  submit(content, form): void {
    console.log(content);
    console.log(form.childNodes);
    console.log(form.querySelector('#itemsinput').childNodes);
    const groupName = form.querySelector('#groupName').value;

    const itemsArr: string[] = [];
    for (const item of form.querySelector('#itemsinput').childNodes) {
      itemsArr.push(item.value);
    }
    console.log(itemsArr);

    this.group = {name: groupName, items: itemsArr, tasks: [], color: this.color};
    this.modalService.dismissAll();

    this.groupTaskService.addGroup(this.group);
  }

}
