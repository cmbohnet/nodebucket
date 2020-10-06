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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService, private http: HttpClient) {
   this.taskService.findAllTasks().subscribe(res => {
    console.log(res);
    this.todo =  res['data'].todo;
     this.done = res['data'].done;
     console.log(this.todo);
     console.log(this.done);
   }, err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}

