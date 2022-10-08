import { Component, OnInit } from '@angular/core';
import { ListService } from './list/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shopping list';

  constructor(public listService: ListService) {}

  ngOnInit(): void {
    this.listService.loadItemsGroups().subscribe();
  }
}
