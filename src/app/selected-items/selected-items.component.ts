import {Component, OnInit} from '@angular/core';
import {ListService} from "../list/list.service";
import {Item} from "../list/item.model";

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit {

  private items: Item[] = [];
  arrangedItems: Item[] = [];
  text: string = '';

  constructor(public listService: ListService) {
  }

  ngOnInit(): void {
    this.buildLinesFromState();
  }

  changeLineState(item: Item) {
    item.flipState()
    this.arrangedItems = this.arrangeItems();
  }

  private arrangeItems() {
    return this.findNotChecked().concat(this.findChecked());
  }

  parseText() {
    this.listService.selectFromText(this.text);
    this.buildLinesFromState();
  }

  findChecked = () => this.items.filter(line => line.isStateChecked());
  findNotChecked = () => this.items.filter(line => !line.isStateChecked());

  private buildLinesFromState = () => {
    this.items = this.listService
      .getSelectedItems();
    this.arrangedItems = this.arrangeItems();
  }
}
