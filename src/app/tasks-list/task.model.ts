export interface Task {

    // The task model (object)
    name: string;
    date: Date;
    status: string;
    groupName: string;
    item: string;
    description: string;

    // public toObject() {
    //     return {
    //         name: this.name,
    //         date: this.date.toDateString(),
    //         status: this.status,
    //         groupName: this.groupName,
    //         item: this.item,
    //         description: this.description
    //     };
    // }
}
