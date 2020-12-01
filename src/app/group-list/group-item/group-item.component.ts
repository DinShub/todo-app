import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TaskGroup } from '../grouptask.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  // The groups which the component is expressing
  @Input() group: TaskGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
