import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemButtonComponent } from './item-button/item-button.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemsGroupsComponent } from './items-groups/items-groups.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { SelectedItemsComponent } from './selected-items/selected-items.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { HistoryListComponent } from './history-list/history-list.component';
import { RecordButtonComponent } from './record-button/record-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemButtonComponent,
    ItemsGroupsComponent,
    MenuComponent,
    HomeComponent,
    SelectedItemsComponent,
    HistoryListComponent,
    RecordButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CdkAccordionModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
