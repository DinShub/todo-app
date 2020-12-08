import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupTaskService } from './group-task.service';
import { TaskGroup } from './grouptask.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {

  // Array with all the groups
  groups: TaskGroup[] = [];
  subscription: any;
  selGroupEvSub: any;
  selectedGroup: TaskGroup;

  constructor(private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    // Listens to the event if a new group is added
    this.subscription = this.groupTaskService.addGroupEvent.subscribe(
      (newGroups: TaskGroup[]) => this.addGroup(newGroups)
    );

    this.selGroupEvSub = this.groupTaskService.chosenGroupEvent.subscribe((group: TaskGroup) => this.selectedGroup = group);

    // Gets the group if there are any at start up
    if (this.groupTaskService.getGroups()) {
      this.groups = this.groupTaskService.getGroups();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Function when a new group is added
  addGroup(newGroups: TaskGroup[]): void {
    console.log('Group added!');
    this.groups = newGroups;
    console.log(this.groups);
  }

  checkSelected(group: TaskGroup): string {
    return this.selectedGroup === group ? 'selected' : '';
  }

}
