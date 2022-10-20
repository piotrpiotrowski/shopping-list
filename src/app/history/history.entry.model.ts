import { Item } from '../list/item.model';

export class HistoryEntry {
  constructor(
    public key: string,
    public value: Item[],
    public visible: boolean
  ) {}

  appendItems(items: Item[]) {
    let itemsMap = new Map<string, Item>(
      this.value.map((item) => [item.descriptor.name, item])
    );
    items.forEach((item) =>
      itemsMap.set(item.descriptor.name, item)
    );
    return new HistoryEntry(this.key, Array.from(itemsMap.values()), false);
  }

  getItemsAsText = () =>
    this.value.map((item) => item.asString()).join('\n');

}
