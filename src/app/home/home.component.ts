import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";
import {LoaderService} from "../loader.service";
import {RecordedItemDescriptorService} from "../speech/recorded-item-descriptor.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(public listService: ListService,
              public loaderService: LoaderService,
              private clipboard: Clipboard,
              private historyService: HistoryService,
              private recordedItemDescriptorService: RecordedItemDescriptorService,
              private changeDetectorTrigger: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.recordedItemDescriptorService.get()
      .pipe(tap(itemDescriptor => this.listService.select([itemDescriptor])))
      .pipe(tap(() => this.copyToClipboard()))
      .subscribe(() => this.changeDetectorTrigger.detectChanges());
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }
}
