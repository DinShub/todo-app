import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../tasks-list/task.model';
import { TaskService } from '../tasks-list/task.service';
import { TaskGroup } from './grouptask.model';

@Injectable()
export class GroupTaskService {

    /*
        The service to handle the Group Tasks functions

        Properties:
            Array with all the groups from type TaskGroup
            Array with all the possible colors a group can use

        Events:
            chosenGroupEvent - sends the chosen group
            chosenItemEvent - sends the chosen sub group
            addGroupEvent - adds a new group and updates the local storage and all subscribers

        Functions:
            getGroups() -> Reads the groups from the local storage and updates the property and returns a copy of the array
            getColors() -> Function that returns a copy of the colors array
            emitChosenGroup(group: TaskGroup) -> Function to emit the chosenGroupEvent
            emitChosenItem(item: string) -> Function to emit the chosenItemEvent
            emitChosenItem(item: string) -> Function to emit the chosenItemEvent
            addGroup(group: TaskGroup) -> Function to add a new group and updates the local storage
            updateStorage() -> Function to update the local storage. Emits the addGroupEvent
            addTask(group: TaskGroup, task: Task) -> Function that adds the new task to a group and updates the local storage
            updateTask(task: Task) -> Function to update a task within a group and updates the local storage
            deleteTask(task: Task) -> Function that deletes a task from the group and updates the local storage
    */


    // The array with all the groups
    private groups: TaskGroup[] = [];

    // Array with the possible colors
    private colors: string[] = [
        'lime',
        'cyan'
    ];

    // The event if a user presses on a group to view it
    chosenGroupEvent = new EventEmitter<TaskGroup>();

    // The event if a user presses a sub group to view it
    chosenItemEvent = new EventEmitter<string>();

    // The event if a user adds a new group
    addGroupEvent = new EventEmitter<TaskGroup[]>();

    constructor(private taskService: TaskService) {
        // The event if a task was updated
        this.taskService.updateTaskEvent.subscribe(
            (task: Task) => this.updateTask(task)
        );

        // The event if a task was deleted
        this.taskService.deleteTaskEvent.subscribe(
            (task: Task) => this.deleteTask(task)
        );
    }

    // Reads the groups from the local storage and updates the property and returns a copy of the array
    getGroups(): TaskGroup[] {
        this.groups = JSON.parse(localStorage.getItem('groups'));
        if (this.groups) {
            return this.groups.slice();
        } else {
            return null;
        }
    }

    // Function that returns a copy of the colors array
    getColors(): string[] {
        return this.colors.slice();
    }

    // Function to emit the chosenGroupEvent
    emitChosenGroup(group: TaskGroup): void {
        this.chosenGroupEvent.emit(group);
    }

    // Function to emit the chosenItemEvent
    emitChosenItem(item: string): void {
        this.chosenItemEvent.emit(item);
    }

    // Function to add a new group and updates the local storage
    addGroup(group: TaskGroup): void {
        if (this.groups) {
            this.groups.push(group);
        } else {
            this.groups = [group];

        }
        this.updateStorage();
        console.log(this.groups);
    }

    // Function to update the local storage. Emits the addGroupEvent
    updateStorage(): void {
        localStorage.setItem('groups', JSON.stringify(this.groups));
        this.addGroupEvent.emit(this.groups.slice());
    }

    // Function that adds the new task to a group and updates the local storage
    addTask(group: TaskGroup, task: Task): void {
        this.groups.forEach(el => {
            if (el.name === group.name) {
                group.tasks.push(task);
            }
        });
        this.updateStorage();
    }

    // Function to update a task within a group and updates the local storage
    updateTask(task: Task): void {
        console.log('UPDATE TASK');
        this.groups.forEach(el => {
            if (el.name === task.groupName) {
                el.tasks.forEach(elTask => {
                    if (elTask.name === task.name) {
                        elTask = task;
                    }
                });
            }
        });
        this.updateStorage();
    }

    // Function that deletes a task from the group and updates the local storage
    deleteTask(task: Task): void {
        this.groups.forEach(el => {
            if (el.name === task.groupName) {
                el.tasks.splice(el.tasks.indexOf(task), 1);
            }
        });

        this.updateStorage();
    }

}
