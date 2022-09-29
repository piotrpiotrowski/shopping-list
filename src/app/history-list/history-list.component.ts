import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../history/history.service";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  constructor(public historyService: HistoryService, private clipboard: Clipboard) {
  }

  entries: string[][] = []

  ngOnInit(): void {
    this.entries = this.historyService.getAllEntries()
      .map(entry => entry.concat(['hide']));
  }

  extractKey = (entry: string[]) => entry[0].replace(this.historyService.HISTORY_BASE_KEY, '');

  toggle(entry: string[]) {
    entry[2] = this.isVisible(entry) ? 'hide' : 'show';
    if (this.isVisible(entry)) {
      this.clipboard.copy(entry[1]);
    }
  }

  isVisible = (entry: string[]) => entry[2] === 'show';
}
