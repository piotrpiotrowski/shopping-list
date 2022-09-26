import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SelectedItemsComponent} from "./selected-items/selected-items.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'selected-items', component: SelectedItemsComponent}
];
