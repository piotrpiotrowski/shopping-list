import {ChangeDetectorRef, Component} from '@angular/core';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";
import {LoaderService} from "../loader.service";
import {SpeechService} from "../speech/speech.service";
import {ItemDescriptor} from "../list/item-descriptor.model";
import {distinct, map, tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  disableRecordButton = false;

  constructor(public listService: ListService,
              private clipboard: Clipboard,
              private historyService: HistoryService,
              public loaderService: LoaderService,
              public speechService: SpeechService,
              private changeDetectorTrigger: ChangeDetectorRef) {
  }

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }

  recordItemName() {
    this.disableRecordButton = true;
    this.speechService.recognizeWordFrom(this.listService.getAllItemNames())
      .pipe(distinct())
      .pipe(map((word: string) => new ItemDescriptor(word, 1, '')))
      .pipe(tap(value => console.log(value)))
      .subscribe({
        next: itemDescriptor => {
          this.listService.select([itemDescriptor]);
          this.disableRecordButton = false;
          this.changeDetectorTrigger.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.disableRecordButton = false;
          this.changeDetectorTrigger.detectChanges();
        },
        complete: () => console.log("completed")
      });
  }
}
