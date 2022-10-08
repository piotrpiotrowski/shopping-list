import { ItemState } from './item-state.enum';

export class Item {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public quantity: number = 0,
    public note: string = '',
    public state: ItemState = ItemState.NOT_CHECKED
  ) {}

  public increaseQuantity() {
    this.quantity++;
  }

  public setZeroQuantity() {
    this.quantity = 0;
  }

  asString = () =>
    `${this.name}${this.resolveQuantityText()}${this.resolveNoteText()}`;

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  addNote(note: string) {
    this.note = note;
  }

  flipState() {
    this.state =
      this.state === ItemState.CHECKED
        ? ItemState.NOT_CHECKED
        : ItemState.CHECKED;
  }

  isStateChecked = () => this.state === ItemState.CHECKED;

  private resolveNoteText = () =>
    this.note.length === 0 ? '' : ` (${this.note})`;

  private resolveQuantityText = () =>
    this.quantity == 1 ? '' : ` ${this.quantity}x`;

  merge = (item: Item) =>
    new Item(
      this.id,
      this.name,
      this.category,
      this.quantity + item.quantity,
      `${this.note}, ${item.note}`,
      this.state
    );
}
