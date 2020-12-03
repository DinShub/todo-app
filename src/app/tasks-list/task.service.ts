import { EventEmitter } from '@angular/core';
import { Task } from './task.model';

export class TaskService {

    // This is the TaskService
    // Task array that holds all the tasks

    viewTask = new EventEmitter<Task>();
    updateTaskEvent = new EventEmitter<Task>();
    deleteTaskEvent = new EventEmitter<Task>();

    // getTasks(): Task[] {
    //     return this.tasks.slice();
    // }

    openTask(task: Task): void {
        this.viewTask.emit(task);
        console.log("open task event");
    }

    updateTask(task: Task): void {
        this.updateTaskEvent.emit(task);
    }

    deleteTask(task: Task): void {
        this.deleteTaskEvent.emit(task);
    }

}
