import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../history/history.service';
import {HistoryEntry} from '../history/history.entry.model';
import {Clipboard} from '@angular/cdk/clipboard';
import {ListService} from "../list/list.service";
import {ItemState} from "../list/item-state.enum";
import {Item} from "../list/item.model";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  constructor(
    public historyService: HistoryService,
    private clipboard: Clipboard,
    private listService: ListService,
    private loaderService: LoaderService
  ) {
  }

  entries: HistoryEntry[] = [];

  ngOnInit(): void {
    this.loaderService.load()
      .subscribe(() => this.entries = this.historyService.getAllEntries());
  }

  extractKey = (key: string) =>
    key.replace(this.historyService.HISTORY_BASE_KEY, '');

  toggle(entry: HistoryEntry) {
    entry.visible = !entry.visible;
  }

  copyToClipboard(entry: HistoryEntry) {
    this.clipboard.copy(entry.getItemsAsText());
  }

  exportUncategorized() {
    const unknownItems = this.historyService.getAllEntries()
        .map(entry => this.findItemsWithCategoryUnknown(entry.value))
        .reduce((accumulator, items) => accumulator.concat(items), []);
    console.log(unknownItems.join('\n'));
    this.clipboard.copy(unknownItems.join('\n'));
  }

  private findItemsWithCategoryUnknown(items: Item[]) {
    return items.filter(item => item.category === 'nieznane')
      .map(item => item.descriptor.name)
  }

  addNotChecked(entry: HistoryEntry) {
    this.listService.select(this.toItemsDescriptors(this.filterNotCheckedItems(entry)));
  }

  addAll(entry: HistoryEntry) {
    this.listService.select(this.toItemsDescriptors(entry.value));
  }

  private filterNotCheckedItems = (entry: HistoryEntry) => entry.value.filter(item => item.state === ItemState.NOT_CHECKED);

  private toItemsDescriptors = (items: Item[]) => items.map(value => value.descriptor);
}
