import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsGroup} from "./items-group.model";
import {Observable, of} from "rxjs";
import {Item} from "../list/item.model";

@Component({
  selector: 'app-items-groups',
  templateUrl: './items-groups.component.html',
  styleUrls: ['./items-groups.component.scss']
})
export class ItemsGroupsComponent implements OnInit {

  @Input() itemsGroupsSource: Observable<ItemsGroup[]> = of([]);
  @Output() selected = new EventEmitter<Item>();

  itemsGroups: ItemsGroup[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.itemsGroupsSource.subscribe({
      next: itemsGroups => this.itemsGroups = itemsGroups,
      error: console.error
    });
  }

  onSelection(item: Item) {
    this.selected.emit(item);
  }

  addToUnknown(input: HTMLInputElement) {
    this.itemsGroups[this.itemsGroups.length - 1].items.push(new Item(0, input.value, this.itemsGroups[this.itemsGroups.length - 1].name, 1));
    input.value = '';
  }
}
