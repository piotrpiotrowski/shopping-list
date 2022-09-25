import {Component, OnInit} from '@angular/core';
import {ItemsGroup} from "../items-groups/items-group.model";
import {ListService} from "../list/list.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemsGroups: ItemsGroup[] = [];

  constructor(public listService: ListService) {
  }

  ngOnInit(): void {
    this.listService.loadItems()
      .subscribe({
        next: value => this.itemsGroups = value,
        error: console.error
      });
  }
}
