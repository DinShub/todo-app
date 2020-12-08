import { EventEmitter } from '@angular/core';
import { Task } from './task.model';

export class TaskService {

    // This is the TaskService
    //
    // Events-
    // viewTask -> Event that emits the task which was selected to be viewed
    // updateTaskEvent -> Event that emits the updated task
    // deleteTaskEvent -> Event that emits when a task was deleted and which task
    //
    // Functions-
    // openTask(task) -> emits the task that is requested to be opened
    // updateTask(task) -> emits the task that was updated
    // deleteTask(task) -> emits the task that was deleted

    viewTask = new EventEmitter<Task>();
    updateTaskEvent = new EventEmitter<Task>();
    deleteTaskEvent = new EventEmitter<Task>();

    openTask(task: Task): void {
        this.viewTask.emit(task);
        console.log('open task event');
    }

    updateTask(task: Task): void {
        this.updateTaskEvent.emit(task);
    }

    deleteTask(task: Task): void {
        this.deleteTaskEvent.emit(task);
    }

}
