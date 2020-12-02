import { Component, OnInit } from '@angular/core';
import { GroupTaskService } from './group-task.service';
import { TaskGroup } from './grouptask.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  // Array with all the groups
  groups: TaskGroup[] = [];

  constructor(private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    // Listens to the event if a new group is added
    this.groupTaskService.addGroupEvent.subscribe(
      (newGroups: TaskGroup[]) => this.addGroup(newGroups)
    );

    // Gets the group if there are any at start up
    if (this.groupTaskService.getGroups()) {
      this.groups = this.groupTaskService.getGroups();
    }
  }

  // Function when a group is chosen by the user
  chooseGroup(group: TaskGroup): void {
    console.log(group);
    this.groupTaskService.emitChosenGroup(group);
  }

  // Function when a new group is added
  addGroup(newGroups: TaskGroup[]): void {
    console.log('Group added!');
    this.groups = newGroups;
    console.log(this.groups);
  }

}
