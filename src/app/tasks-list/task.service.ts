import { Task } from './task.model';

export class TaskService {

    // This is the TaskService
    // Task array that holds all the tasks

    private tasks: Task[] = [new Task('Test', new Date(), 'TODO')];

    getTasks(): Task[] {
        return this.tasks.slice();
    }

}
