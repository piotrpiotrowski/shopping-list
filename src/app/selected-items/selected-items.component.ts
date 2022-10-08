import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListService } from '../list/list.service';
import { Item } from '../list/item.model';
import { HistoryService } from '../history/history.service';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit, OnDestroy {
  private items: Item[] = [];
  arrangedItems: Item[] = [];
  text: string = '';

  constructor(
    public listService: ListService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.buildLinesFromState();
  }

  ngOnDestroy(): void {
    this.historyService.addEntry(this.listService.getSelectedItems());
  }

  changeLineState(item: Item) {
    item.flipState();
    this.arrangedItems = this.arrangeItems();
  }

  private arrangeItems() {
    return this.findNotChecked().concat(this.findChecked());
  }

  parseText() {
    this.listService.selectFromText(this.text);
    this.buildLinesFromState();
  }

  findChecked = () => this.items.filter((line) => line.isStateChecked());

  findNotChecked = () => this.items.filter((line) => !line.isStateChecked());

  private buildLinesFromState = () => {
    this.items = this.listService.getSelectedItems();
    this.arrangedItems = this.arrangeItems();
  };
}
