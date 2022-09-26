import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsGroup} from "./items-group.model";
import {ItemEvent} from "../item-button/item-event.model";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-items-groups',
  templateUrl: './items-groups.component.html',
  styleUrls: ['./items-groups.component.scss']
})
export class ItemsGroupsComponent implements OnInit {

  @Input() itemsGroupsSource: Observable<ItemsGroup[]> = of([]);
  @Output() selected = new EventEmitter<ItemEvent>();

  itemsGroups: ItemsGroup[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.itemsGroupsSource.subscribe({
      next: itemsGroups => this.itemsGroups = itemsGroups,
      error: console.error
    });
  }

  onSelection(itemEvent: ItemEvent) {
    this.selected.emit(itemEvent);
  }
}
