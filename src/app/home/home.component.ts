import {Component} from '@angular/core';
import {ItemsGroup} from '../items-groups/items-group.model';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  itemsGroups: ItemsGroup[] = [];

  constructor(public listService: ListService, private clipboard: Clipboard, private historyService: HistoryService) {}

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }
}
