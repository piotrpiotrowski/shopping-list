import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SelectedItemsComponent} from './selected-items/selected-items.component';
import {HistoryListComponent} from './history-list/history-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'p', pathMatch: 'full'},
  {path: ':userId', component: HomeComponent},
  {path: 'selected-items', component: SelectedItemsComponent},
  {path: 'history-list', component: HistoryListComponent}
];
