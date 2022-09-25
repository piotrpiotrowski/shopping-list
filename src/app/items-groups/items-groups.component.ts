import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemsGroup} from "./items-group.model";
import {Item} from "../item-button/item.model";

@Component({
  selector: 'app-items-groups',
  templateUrl: './items-groups.component.html',
  styleUrls: ['./items-groups.component.scss']
})
export class ItemsGroupsComponent {

  @Input() itemsGroups: ItemsGroup[] = [];
  @Output() selected = new EventEmitter<Item>();

  constructor() {
  }

  onSelection(item: Item) {
    this.selected.emit(item);
  }
}
