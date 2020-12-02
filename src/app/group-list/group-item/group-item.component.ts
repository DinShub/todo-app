import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GroupTaskService } from '../group-task.service';
import { TaskGroup } from '../grouptask.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  // The groups which the component is expressing
  @Input() group: TaskGroup;

  @Input() selected = false;
  selectedItem = '';

  constructor(private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    this.groupTaskService.chosenGroupEvent.subscribe(
      (group: TaskGroup) => this.checkSelection(group)
      );
    console.log(JSON.parse(JSON.stringify(this.group)));
    console.log(this.group);
  }

  itemSelected(item: string): void {
    this.selectedItem = item;
    this.groupTaskService.chosenGroupEvent.emit(this.group);
    this.selected = true;
  }

  getColor(item: string): string {
    return item === this.selectedItem && this.selected ? this.group.color : 'black';
  }

  checkSelection(group: TaskGroup): void {
    this.selected = this.group === group;
    if (!this.selected) {
      this.selectedItem = '';
    }
  }

}
