/**
 * Title: home.component.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: home.component.module
 * Modifications:
 * 10/5/20 - add code for findAllTasks
 */
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/shared/task.service';
import {HttpClient} from '@angular/common/http';
import {Item} from '../../shared/item.interface';
import {CookieService} from 'ngx-cookie-service';
import {Employee} from '../../shared/employee.interface';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //tasks: any;
  //the difference between open and close brackets means its an array
  //the carrot says the type.
  //declarations are the same.  array is a generic type
  //always specify the type when you can instead of
  //declaring a generic array and then specify the type within it

  //todo: Array<Item>;
 //done: Array<Item>;

  todo: Item[];
  done: Item[];

  employee: Employee;

  //to refresh employee id
  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user');

     this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('Server response from findAllTasks');
      console.log(res);

     //data is code getting back from api
     this.employee=res.data;
     console.log('Employee object');
     console.log(this.employee);
 // this.todo =  res['data'].todo;
     // this.done = res['data'].done;

    // console.log(this.todo);
    // console.log(this.done);
   }, err => {
      console.log(err);
    }, () => {
      //oncomplete method. always happens. processes lst so the api call will get done before this executes in order for it
      //not to keep going and getting undefined when trying to populate todo and done
      //where it was before (this.tod = res['data].todo).
      //oncomplete is best place to be mapping data
      //if error fires, complete will not
      this.todo = this.employee[0].todo;
      this.done = this.employee[0].done;

      console.log('This is the complete function');
      console.log(this.todo);
      console.log(this.done);
    })

   }

  ngOnInit(): void {
  }

  //event listener for material drag and drop
  drop(event: CdkDragDrop<any[]>){
    console.log('previousContainer event');
    console.log(event.previousContainer);

    console.log('container event');
    console.log(event.container);

    if(event.previousContainer == event.container) {

      moveItemInArray(event.container.data,event.previousIndex, event.currentIndex);

      console.log('reordered the existing list');
      console.log('empId ' + this.empId + ' todo ' + this.todo + ' done ' + this.done);

      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      //move items to new array
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log('move task item to the new container');

      this.updateTaskList(this.empId, this.todo, this.done);

    }

  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId,todo,done).subscribe(res => {
      this.employee = res.data;
      console.log('employee object in updateTaskList ');
      console.log(this.employee);
     }, err => {
       console.log(err)
     }, () => {
       this.todo = this.employee.todo;
       this.done = this.employee.done;
     })
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  deleteTask(taskId: string) {
    if (taskId) {
      console.log('Task item:  ${taskId} was deleted ');

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo =this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }
}

