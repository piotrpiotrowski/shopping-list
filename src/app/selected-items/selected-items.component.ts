import {Component, OnInit} from '@angular/core';
import {ListService} from '../list/list.service';
import {Item} from '../list/item.model';
import {HistoryService} from '../history/history.service';
import {DescriptorParserService} from "../parser/descriptor-parser.service";

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit {
  private items: Item[] = [];
  arrangedItems: Item[] = [];
  text: string = '';

  constructor(
    public listService: ListService,
    private historyService: HistoryService,
    private descriptorParserService: DescriptorParserService
  ) {
  }

  ngOnInit(): void {
    this.populateSelectedItems();
  }

  changeLineState(item: Item) {
    item.flipState();
    this.arrangedItems = this.arrangeItems();
    this.historyService.addEntry(this.items);
  }

  parseText() {
    this.listService.select(this.descriptorParserService.parse(this.text));
    this.populateSelectedItems();
  }

  findChecked = () => this.items.filter((line) => line.isStateChecked());

  findNotChecked = () => this.items.filter((line) => !line.isStateChecked());

  private arrangeItems() {
    return this.findNotChecked().concat(this.findChecked());
  }

  private populateSelectedItems = () => {
    this.items = this.listService.getSelectedItems();
    this.arrangedItems = this.arrangeItems();
    this.historyService.addEntry(this.items);
  };
}
