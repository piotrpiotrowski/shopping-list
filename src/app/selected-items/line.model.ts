import {LineState} from "./line-state.enum";
import {Item} from "../item-button/item.model";

export class Line {
  constructor(public item: Item, public state: LineState) {
  }

  public isStateChecked() {
    return this.state === LineState.CHECKED;
  }
}
