export class Item {
  constructor(public id: number, public name: string, public category: string, public quantity: number = 0) {
  }

  public increaseQuantity() {
    this.quantity++;
  }

  public setZeroQuantity() {
    this.quantity = 0;
  }

  asString = () => this.quantity == 1 ? this.name : `${this.name} ${this.quantity}x`

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
}
