import { Component, OnInit } from '@angular/core';
import { GroupTaskService } from './group-task.service';
import { TaskGroup } from './grouptask.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  providers: [GroupTaskService]
})
export class GroupListComponent implements OnInit {

  // Array with all the groups
  groups: TaskGroup[] = [];

  constructor(private groupTaskService: GroupTaskService) { }

  ngOnInit(): void {
    this.groups = this.groupTaskService.getGroups();
  }

}
