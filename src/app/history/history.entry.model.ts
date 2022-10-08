import {Item} from "../list/item.model";

export class HistoryEntry {
  constructor(public key: string, public value: Item[], public visible: boolean) {
  }

  appendItems(items: Item[]) {
    let itemsMap = new Map<string, Item>(this.value.map(item => [item.name, item]));
    items.forEach(item => itemsMap.set(item.name, this.mergeIfNeeded(itemsMap.get(item.name), item)));
    return new HistoryEntry(this.key, Array.from(itemsMap.values()), false);
  }

  private mergeIfNeeded = (foundItem: Item | undefined, item: Item) => foundItem ? foundItem.merge(item) : item;
}
