/**
 * Title: app.component.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: app.component
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent {
  title = 'nodebucket';
}
