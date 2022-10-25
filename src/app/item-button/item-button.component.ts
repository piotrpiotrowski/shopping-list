import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../list/item.model';
import {ItemDescriptor} from "../list/item-descriptor.model";

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {
  @Input() item: Item = new Item(new ItemDescriptor('', 0), '');
  @Output() updated = new EventEmitter<Item>();
  addNoteVisible: boolean = false;
  noteText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.noteText = this.item.descriptor.note;
  }

  addToList() {
    this.item.increaseQuantity();
    this.emitEvent();
  }

  removeFromList() {
    this.item.setZeroQuantity();
    this.emitEvent();
  }

  isStateSelected() {
    return this.item.descriptor.quantity === 1;
  }

  isStateMultiSelected() {
    return this.item.descriptor.quantity > 1;
  }

  resolveStateClass() {
    if (this.item.descriptor.quantity === 0) {
      return '';
    }
    if (this.item.descriptor.quantity === 1) {
      return 'selected';
    }
    return 'multi_selected';
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
    this.updated.emit(this.item);
  }
}
