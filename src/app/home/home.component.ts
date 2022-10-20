import {Component} from '@angular/core';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public listService: ListService,
              private clipboard: Clipboard,
              private historyService: HistoryService,
              public loaderService: LoaderService) {
  }

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }
}
