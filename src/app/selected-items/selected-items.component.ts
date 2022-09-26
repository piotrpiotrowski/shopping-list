import {Component, OnInit} from '@angular/core';
import {Line} from "./line.model";
import {LineState} from "./line-state.enum";
import {ListService} from "../list/list.service";

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit {

  lines: Line[] = [];
  title: string = 'Selected items';
  text: string = '';

  constructor(public listService: ListService) {
  }

  ngOnInit(): void {
    this.buildLinesFromState();
  }

  changeLineState(line: Line) {
    line.state = line.state === LineState.CHECKED ? LineState.NOT_CHECKED : LineState.CHECKED;
    this.moveCheckedDown();
  }

  parseInputText($event: Event) {
    this.lines = this.text.trim()
      .split('\n')
      .map(line => this.createLine(line));
  }

  private buildLinesFromState = () => {
    return this.lines = this.listService
      .getSelectedItems()
      .map(item => this.createLine(item.asString()));
  }

  private createLine(line: string) {
    return new Line(line, LineState.NOT_CHECKED);
  }

  private moveCheckedDown() {
    this.lines.sort((a, b) => a.getWeight() - b.getWeight());
  }

}
