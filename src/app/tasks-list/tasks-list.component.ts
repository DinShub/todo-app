import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupTaskService } from '../group-list/group-task.service';
import { TaskGroup } from '../group-list/grouptask.model';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit, OnDestroy {

  group: TaskGroup;
  subscription: any;
  tasksToShow: Task[] = [];
  selectedFilter = 'all';
  addGroupSub: any;
  searchTerm = '';

  constructor(private groupTaskService: GroupTaskService, private taskService: TaskService) { }

  ngOnInit(): void {
    // The event to get the chosen group to display
    this.subscription = this.groupTaskService.chosenGroupEvent.subscribe((newGroup: TaskGroup) => this.groupSelected(newGroup));
    this.addGroupSub = this.groupTaskService.addGroupEvent.subscribe(() => this.updateTasksToShow());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addGroupSub.unsubscribe();
  }

  groupSelected(newGroup: TaskGroup): void {
    this.group = newGroup;
    this.updateTasksToShow();
  }

  // The function to highlight the selected category
  onClick(ev: any): void {
    console.log(ev.target.parentNode.children);
    for (const child of ev.target.parentNode.children) {
      child.classList.remove('li-active');
    }
    ev.target.classList.add('li-active');
    console.log(ev.target.innerText);
    this.selectedFilter = ev.target.innerText.toLowerCase();
    this.updateTasksToShow();
  }

  editGroup(): void {
    console.log('edit group');
    this.groupTaskService.editGroup(this.group);
  }

  updateTasksToShow(): void {
    // this.tasksToShow = this.group.tasks.filter(task => {
    //   if (this.selectedFilter === 'all') {
    //     return true;
    //   } else if (this.selectedFilter === 'not yet completed' && task.status !== 'done') {
    //     return true;
    //   } else if (this.selectedFilter === 'done' && task.status === 'done') {
    //     return true;
    //   }
    //   return false;
    // });

    // this.tasksToShow = this.tasksToShow.filter(task => this.groupTaskService.getItem() === task.item || this.groupTaskService.getItem() === '');

    // this.tasksToShow = this.tasksToShow.filter(task => task.name.toLowerCase().includes(this.searchTerm));

    this.tasksToShow = this.group.tasks.filter(task => this.checkFilters(task));
  }

  updateSearchTerm(newTerm: string): void {
    this.searchTerm = newTerm.toLowerCase();
    this.updateTasksToShow();
  }

  checkFilters(task: Task): boolean {
    let rtnValue = false;
    if (this.selectedFilter === 'all') {
      rtnValue = true;
    } else if (this.selectedFilter === 'not yet completed' && task.status !== 'done') {
      rtnValue = true;
    } else if (this.selectedFilter === 'done' && task.status === 'done') {
      rtnValue = true;
    }

    if (this.groupTaskService.getItem() !== task.item && this.groupTaskService.getItem() !== '') {
      rtnValue = false;
    }



    return rtnValue && task.name.toLowerCase().includes(this.searchTerm);
  }

}
