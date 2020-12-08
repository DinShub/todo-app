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

  // The current selected group
  selectedGroup: TaskGroup;

  // The chosen group event subscription
  chosenGroupSubscription: any;

  // The tasks we show after filtering
  tasksToShow: Task[] = [];

  // The selected filter
  selectedFilter = 'all';

  // The add group event subscription
  addGroupSub: any;

  // The term we search in the search bar
  searchTerm = '';

  constructor(private groupTaskService: GroupTaskService, private taskService: TaskService) { }

  ngOnInit(): void {
    // The event to get the chosen group to display
    this.chosenGroupSubscription = this.groupTaskService.chosenGroupEvent.subscribe((newGroup: TaskGroup) => this.groupSelected(newGroup));
    // The event to update the lists when a new group was added or modified
    this.addGroupSub = this.groupTaskService.addGroupEvent.subscribe(() => this.updateTasksToShow());
  }

  ngOnDestroy(): void {
    this.chosenGroupSubscription.unsubscribe();
    this.addGroupSub.unsubscribe();
  }

  // When a new group was selected, we need to update it in this component
  groupSelected(newGroup: TaskGroup): void {
    this.selectedGroup = newGroup;
    // Update the taskToShow array when a new group was selected
    this.updateTasksToShow();
  }

  // The function to highlight the selected filter
  highlightFilter(ev: any): void {
    // console.log(ev.target.parentNode.children);

    // loop through all the avaliable filters and making sure non are selected
    for (const child of ev.target.parentNode.children) {
      child.classList.remove('li-active');
    }

    // Adding the active class to the selected filter
    ev.target.classList.add('li-active');
    // console.log(ev.target.innerText);

    // Updating the selected filter
    this.selectedFilter = ev.target.innerText.toLowerCase();

    // Filtering the tasks
    this.updateTasksToShow();
  }

  // When a group was edited, we need to update the list
  editGroup(): void {
    // console.log('edit group');
    this.groupTaskService.editGroup(this.selectedGroup);
  }

  // Updating the tasks we need to show after filtering
  updateTasksToShow(): void {
    this.tasksToShow = this.selectedGroup.tasks.filter(task => this.checkFilters(task));
  }

  // The event when the search bar was updated
  updateSearchTerm(newTerm: string): void {
    this.searchTerm = newTerm.toLowerCase();
    this.updateTasksToShow();
  }

  // Checking if the task is answering the filter
  checkFilters(task: Task): boolean {
    let rtnValue = false; // The boolean we return to know if we need the task

    // checking if the task is answering the filters
    if (this.selectedFilter === 'all') {
      rtnValue = true;
    } else if (this.selectedFilter === 'not yet completed' && task.status !== 'done') {
      rtnValue = true;
    } else if (this.selectedFilter === 'done' && task.status === 'done') {
      rtnValue = true;
    }

    // checking if the item is part of the group
    if (this.groupTaskService.getItem() !== task.item && this.groupTaskService.getItem() !== '') {
      rtnValue = false;
    }

    // If the task is answering all the filters and his name contains the search term, return true
    return rtnValue && task.name.toLowerCase().includes(this.searchTerm);
  }

}
