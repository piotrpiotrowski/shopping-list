import {LineState} from "./line-state.enum";

export class Line {
  constructor(public text: string, public state: LineState) {
  }

  public getWeight() {
    return this.state === LineState.CHECKED ? 1 : 0;
  }
}
