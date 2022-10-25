import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsGroup} from './items-group.model';
import {Observable, of} from 'rxjs';
import {Item} from '../list/item.model';
import {ItemDescriptor} from "../list/item-descriptor.model";

@Component({
  selector: 'app-items-groups',
  templateUrl: './items-groups.component.html',
  styleUrls: ['./items-groups.component.scss']
})
export class ItemsGroupsComponent implements OnInit {
  @Input() itemsGroupsSource: Observable<ItemsGroup[]> = of([]);
  @Output() updated = new EventEmitter<Item>();

  itemsGroups: ItemsGroup[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.itemsGroupsSource.subscribe({
      next: (itemsGroups) => (this.itemsGroups = itemsGroups),
      error: console.error
    });
  }

  onUpdate(item: Item) {
    this.updated.emit(item);
  }

  addToUnknown(input: HTMLInputElement) {
    const item = this.createUnknownItem(input.value);
    this.itemsGroups[this.itemsGroups.length - 1]
      .items.push(item);
    input.value = '';
    this.onUpdate(item)
  }

  private createUnknownItem = (text: string) =>
    new Item(
      new ItemDescriptor(text, 1),
      this.itemsGroups[this.itemsGroups.length - 1].name
    );
}
