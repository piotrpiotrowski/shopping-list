import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "./item.model";
import {ItemButtonState} from "./item-button-state";

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {

  @Input() item: Item = new Item(0,'', '');
  @Output() selected = new EventEmitter<Item>();
  state = ItemButtonState.NOT_SELECTED;
  quantity = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  addToList() {
    this.selected.emit(this.item);
    this.quantity++;
    this.state = this.quantity === 1 ? ItemButtonState.SELECTED : ItemButtonState.MULTI_SELECTED;
  }

  isStateSelected() {
    return this.state === ItemButtonState.SELECTED;
  }

  isStateMultiSelected() {
    return this.state === ItemButtonState.MULTI_SELECTED;
  }
}
