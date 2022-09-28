export class Item {
  constructor(public id: number, public name: string, public category: string, public quantity: number = 0, public note: string = '') {
  }

  public increaseQuantity() {
    this.quantity++;
  }

  public setZeroQuantity() {
    this.quantity = 0;
  }

  asString = () => `${this.name}${this.resolveQuantityText()}${this.resolveNoteText()}`

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  addNote(note: string) {
    this.note = note;
  }

  private resolveNoteText = () => this.note.length === 0 ? '' : ` (${this.note})`;

  private resolveQuantityText = () => this.quantity == 1 ? '' : ` ${this.quantity}x`;
}
