import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../list/item.model";

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {

  @Input() item: Item = new Item(0, '', '');
  @Output() selected = new EventEmitter<Item>();
  addNoteVisible: boolean = false;
  noteText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.noteText = this.item.note;
  }

  addToList() {
    this.item.increaseQuantity();
    this.emitEvent();
  }

  removeFromList() {
    this.item.setZeroQuantity()
    this.selected.emit(this.item);
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
      this.emitEvent();
    }
  }

  showNoteInput() {
    this.addNoteVisible = true;
  }

  private emitEvent() {
    this.selected.emit(this.item);
  }
}
