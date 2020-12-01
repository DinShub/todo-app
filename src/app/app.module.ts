import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { GroupItemComponent } from './group-list/group-item/group-item.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalTaskComponent } from './tasks-list/modal-task/modal-task.component';
import { TaskComponent } from './tasks-list/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupListComponent,
    TasksListComponent,
    GroupItemComponent,
    ModalTaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
