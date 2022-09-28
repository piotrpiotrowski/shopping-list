import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "./item.model";
import {ItemEvent} from "./item-event.model";
import {ItemOperation} from "./Item-operation.enum";

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {

  @Input() item: Item = new Item(0, '', '');
  @Output() selected = new EventEmitter<ItemEvent>();
  addNoteVisible: boolean = false;
  noteText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.noteText = this.item.note;
  }

  addToList() {
    this.item.increaseQuantity();
    this.selected.emit(new ItemEvent(this.item, ItemOperation.ADD));
  }

  removeFromList() {
    this.item.setZeroQuantity()
    this.selected.emit(new ItemEvent(this.item, ItemOperation.REMOVE));
  }

  isStateSelected() {
    return this.item.quantity === 1;
  }

  isStateMultiSelected() {
    return this.item.quantity > 1;
  }

  resolveStateClass() {
    if (this.item.quantity === 0) {
      return '';
    }
    if (this.item.quantity === 1) {
      return 'selected';
    }
    return 'multi_selected'
  }

  saveNote(event: any) {
    if (event.keyCode === 13) {
      this.addNoteVisible = false;
      this.item.addNote(this.noteText);
    }
  }

  showNoteInput() {
    this.addNoteVisible = true;
  }
}
