import {Item} from "./item.model";
import {ItemOperation} from "./Item-operation.enum";

export class ItemEvent {
  constructor(public item: Item, public operation: ItemOperation) {
  }
}
