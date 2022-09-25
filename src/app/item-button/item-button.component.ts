import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "./item.model";

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {

  @Input() item: Item = new Item('', '');
  @Output() selected = new EventEmitter<Item>();
  state = 'not_selected';

  constructor() {
  }

  ngOnInit(): void {
  }

  addToList() {
    this.selected.emit(this.item);
    this.state = 'selected';
  }
}
