import {Component, OnInit} from '@angular/core';
import {Line} from "./line.model";
import {LineState} from "./line-state.enum";
import {ListService} from "../list/list.service";
import {Item} from "../item-button/item.model";

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit {

  private lines: Line[] = [];
  sortedLines: Line[] = [];
  title: string = 'Selected items';
  text: string = '';

  constructor(public listService: ListService) {
  }

  ngOnInit(): void {
    this.buildLinesFromState();
  }

  changeLineState(line: Line) {
    line.state = line.state === LineState.CHECKED ? LineState.NOT_CHECKED : LineState.CHECKED;
    this.sortedLines = this.findNotChecked().concat(this.findChecked());
  }

  parseText() {
    this.listService.selectFromText(this.text);
    this.buildLinesFromState();
  }

  findChecked = () => this.lines.filter(line => line.isStateChecked());
  findNotChecked = () => this.lines.filter(line => !line.isStateChecked());

  private buildLinesFromState = () => {
    this.lines = this.listService
      .getSelectedItems()
      .map(item => this.createLine(item));
    this.sortedLines = this.lines;
  }

  private createLine(item: Item) {
    return new Line(item, LineState.NOT_CHECKED);
  }
}
