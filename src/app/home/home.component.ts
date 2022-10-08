import {Component, OnInit} from '@angular/core';
import {ItemsGroup} from '../items-groups/items-group.model';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";
import {ActivatedRoute} from "@angular/router";
import {map, NEVER, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsGroupsSource: Observable<ItemsGroup[]> = NEVER;

  constructor(public listService: ListService,
              private clipboard: Clipboard,
              private historyService: HistoryService,
              private route: ActivatedRoute) {
  }

  private readonly DEFAULT_USER = 'p';
  private readonly KNOWN_USERS = [this.DEFAULT_USER, 'm'];

  ngOnInit(): void {
    this.itemsGroupsSource = this.route.paramMap
      .pipe(map(params => params.get('userId') || this.DEFAULT_USER))
      .pipe(map(userId => this.KNOWN_USERS.includes(userId) ? userId : this.DEFAULT_USER))
      .pipe(switchMap(userId => this.listService.loadItemsGroups(userId)));
  }

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }
}
