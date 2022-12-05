import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ListService} from '../list/list.service';
import {Clipboard} from "@angular/cdk/clipboard";
import {HistoryService} from "../history/history.service";
import {LoaderService} from "../loader.service";
import {ItemDescriptor} from "../list/item-descriptor.model";
import {distinct, map, Subscription, tap} from "rxjs";
import {SpeechRecognitionFactory} from "../speech/speech-recognition.factory";
import {SpeechRecognitionService} from "../speech/speech-recognition.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  recordingInProgress = false;
  private subscription?: Subscription;
  private speechRecognitionService: SpeechRecognitionService = new SpeechRecognitionService({} as SpeechRecognition);

  constructor(public listService: ListService,
              private clipboard: Clipboard,
              private historyService: HistoryService,
              public loaderService: LoaderService,
              public speechRecognitionFactory: SpeechRecognitionFactory,
              private changeDetectorTrigger: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.speechRecognitionService = this.speechRecognitionFactory.create(this.listService.getAllItemNames());
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  copyToClipboard() {
    this.clipboard.copy(this.listService.getItemsAsText());
    this.historyService.addEntry(this.listService.getSelectedItems());
  }

  recordItemName() {
    if (!this.recordingInProgress) {
      this.recordingInProgress = true;
      this.subscription = this.speechRecognitionService.recognizeWords()
        .pipe(distinct())
        .pipe(map((word: string) => new ItemDescriptor(word, 1, '')))
        .pipe(tap(value => console.log(value)))
        .subscribe({
          next: itemDescriptor => this.appendItem(itemDescriptor),
          error: (error) => this.handleError(error),
          complete: () => this.finishRecording()
        });
    } else {
      this.speechRecognitionService.stop();
      this.finishRecording();
    }
  }

  private appendItem(itemDescriptor: ItemDescriptor) {
    this.listService.select([itemDescriptor]);
    this.copyToClipboard();
  }

  private handleError(error: Error) {
    console.error(error);
  }

  private finishRecording() {
    this.recordingInProgress = false;
    this.changeDetectorTrigger.detectChanges();
  }
}
