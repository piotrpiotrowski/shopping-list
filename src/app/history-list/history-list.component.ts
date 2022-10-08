import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../history/history.service';
import {HistoryEntry} from '../history/history.entry.model';
import {Clipboard} from '@angular/cdk/clipboard';
import {ListService} from "../list/list.service";
import {ItemState} from "../list/item-state.enum";
import {Item} from "../list/item.model";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  constructor(
    public historyService: HistoryService,
    private clipboard: Clipboard,
    private listService: ListService
  ) {
  }

  entries: HistoryEntry[] = [];

  ngOnInit(): void {
    this.entries = this.historyService.getAllEntries();
  }

  extractKey = (key: string) =>
    key.replace(this.historyService.HISTORY_BASE_KEY, '');

  toggle(entry: HistoryEntry) {
    entry.visible = !entry.visible;
  }

  copyToClipboard(entry: HistoryEntry) {
    this.clipboard.copy(this.getItemsAsText(entry));
  }

  addNotChecked(entry: HistoryEntry) {
    this.listService.select(this.toItemsDescriptors(this.filterNotCheckedItems(entry)));
  }

  private filterNotCheckedItems = (entry: HistoryEntry) => entry.value.filter(item => item.state === ItemState.NOT_CHECKED);

  addAll(entry: HistoryEntry) {
    this.listService.select(this.toItemsDescriptors(entry.value));
  }

  private toItemsDescriptors = (items: Item[]) => items.map(value => value.descriptor);

  private getItemsAsText = (entry: HistoryEntry) =>
    entry.value.map((item) => item.asString()).join('\n');
}
