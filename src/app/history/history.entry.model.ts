import {Item} from "../list/item.model";

export class HistoryEntry {
  constructor(public key: string, public value: Item[], public visible: boolean) {
  }
}
