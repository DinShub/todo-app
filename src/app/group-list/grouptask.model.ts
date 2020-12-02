import { Task } from '../tasks-list/task.model';

export interface TaskGroup {

    // The interface (object) of the Task Group
    name: string;
    items: string[];
    tasks: Task[];
    color: string;

}
