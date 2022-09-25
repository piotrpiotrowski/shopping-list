import {Component, OnInit} from '@angular/core';
import {ListService} from "./list/list.service";
import {Item} from "./item-button/item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopping-list';
  items: Item[] = [
    // new Item("Chleb", "pieczywo"),
    // new Item("Woda", "napoje"),
    // new Item("Fleichkäse", "mieso")
  ];

  constructor(public listService: ListService) {
  }

  ngOnInit(): void {
    this.listService.loadItems()
      .subscribe({
        next: value => this.items = value,
        error: console.error
      });
  }
}
