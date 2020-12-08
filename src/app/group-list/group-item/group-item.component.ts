import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GroupTaskService } from '../group-task.service';
import { TaskGroup } from '../grouptask.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit, OnDestroy {

  // The groups which the component is expressing
  @Input() group: TaskGroup;

  @Input() selected = false;
  selectedItem = '';
  subscription: any;

  constructor(private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    this.subscription = this.groupTaskService.chosenGroupEvent.subscribe(
      (group: TaskGroup) => this.checkSelection(group)
      );
    console.log(JSON.parse(JSON.stringify(this.group)));
    console.log(this.group);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  itemSelected(item: string): void {
    // this.selectedItem = item;
    console.log(`item chosen ${item}`);
    this.groupTaskService.emitChosenItem(item, this.group);
    this.selected = true;
  }

  getColor(item: string): string {
    return (item === this.groupTaskService.getItem() && this.selected ? 'highlight' : '');
  }

  checkSelection(group: TaskGroup): void {
    this.selected = this.group === group;
    if (!this.selected) {
      this.selectedItem = this.groupTaskService.getItem();
    }
  }

  groupSelected(): void {
    console.log('groupSelected');
    this.groupTaskService.emitChosenGroup(this.group);
  }

}
