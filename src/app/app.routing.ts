/**
 * Title: app.routing.ts
 * Author: Chris Bohnet
 * Date: 23 September 2020
 * Description: app.routing
 */
import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
      /*
        New components go here...
       */
    ]
  }
];
