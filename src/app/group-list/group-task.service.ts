import { TaskGroup } from './grouptask.model';

export class GroupTaskService {

    // The service to handle the Group Tasks functions
    // Array with all the groups from type TaskGroup
    //
    // getGroups() -> returns a copy of the groups array

    private groups: TaskGroup[] = [
        new TaskGroup('Group 1', ['item 1', 'item 2']),
        new TaskGroup('Group 2', ['item 3', 'item 4', 'item 5'])
    ];

    getGroups(): TaskGroup[] {
        return this.groups.slice();
    }
}
