import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'walmart', pathMatch: 'full'},
  {path: 'walmart', loadChildren: 'app/modules/walmart/walmart.module#WalmartModule'}
];
