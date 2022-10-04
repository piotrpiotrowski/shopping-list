import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../history/history.service";
import {HistoryEntry} from "../history/history.entry.model";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  constructor(public historyService: HistoryService, private clipboard: Clipboard) {
  }

  entries: HistoryEntry[] = [];

  ngOnInit(): void {
    this.entries = this.historyService.getAllEntries();
  }

  extractKey = (key: string) => key.replace(this.historyService.HISTORY_BASE_KEY, '');

  toggle(entry: HistoryEntry) {
    entry.visible = !entry.visible;
    if (entry.visible) {
      this.clipboard.copy(entry.value.map(item => item.asString()).join('\n'));
    }
  }
}
