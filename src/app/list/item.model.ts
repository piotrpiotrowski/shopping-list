import {ItemState} from './item-state.enum';
import {ItemDescriptor} from "./item-descriptor.model";

export class Item {
  constructor(
    public descriptor: ItemDescriptor,
    public category: string,
    public state: ItemState = ItemState.NOT_CHECKED
  ) {
  }

  public increaseQuantity() {
    this.descriptor.quantity++;
  }

  public setZeroQuantity() {
    this.descriptor.quantity = 0;
  }

  asString = () =>
    `${this.descriptor.name}${this.resolveQuantityText()}${this.resolveNoteText()}`;

  setQuantity(quantity: number) {
    this.descriptor.quantity = quantity;
  }

  addNote(note: string) {
    this.descriptor.note = note;
  }

  flipState() {
    this.state =
      this.state === ItemState.CHECKED
        ? ItemState.NOT_CHECKED
        : ItemState.CHECKED;
  }

  isStateChecked = () => this.state === ItemState.CHECKED;

  private resolveNoteText = () =>
    this.descriptor.note.length === 0 ? '' : ` (${this.descriptor.note})`;

  private resolveQuantityText = () =>
    this.descriptor.quantity == 1 ? '' : ` ${this.descriptor.quantity}x`;
}
