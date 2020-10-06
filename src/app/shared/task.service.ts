
/**
 * Title: task.interface.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: task.interface module
 * interface of task inside of the arrays
 */
import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser = this.cookieService.get('session_user');
  }
/**
 * findAllTasks
 */
findAllTasks() {
  return this.http.get('/api/employees/' + this.sessionUser + '/tasks');

}

 /**
  *createTask

 createTasks() {
  return this.http.post('/api/employees/' + this.sessionUser + '/tasks', string);

}
*/
  /**
   * updateTasks
   */

   /**
    * deleteTasks
    */


}
