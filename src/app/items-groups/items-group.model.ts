import {Item} from "../item-button/item.model";

export class ItemsGroup {
  constructor(public name: string, public items: Item[]) {
  }

  filterSelected() {
    return this.items.filter(item => item.quantity > 0);
  }

  findItem = (line: string) => this.items.find(item => item.name === line)
}
