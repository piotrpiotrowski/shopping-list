import {Item} from "../list/item.model";

export class ItemsGroup {
  constructor(public name: string, public items: Item[]) {
  }

  filterSelected() {
    return this.items.filter(item => item.quantity > 0);
  }

  countSelected() {
    return this.items.reduce((counter, item) => counter + (item.quantity > 0 ? 1 : 0), 0)
  }

  findItem = (line: string) => this.items.find(item => item.name === line);
}
