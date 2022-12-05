import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SpeechRecognitionFactory} from "../speech/speech-recognition.factory";
import {distinct, map, Observable, of, Subscription} from "rxjs";
import {ItemDescriptor} from "../list/item-descriptor.model";
import {SpeechRecognitionService} from "../speech/speech-recognition.service";
import {ItemsGroup} from "../items-groups/items-group.model";

@Component({
  selector: 'app-record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.scss']
})
export class RecordButtonComponent implements OnInit, OnDestroy {

  @Input() itemsGroupsSource: Observable<ItemsGroup[]> = of([]);
  @Output() recorded = new EventEmitter<ItemDescriptor>();

  recordingInProgress = false;
  private subscription: Subscription = new Subscription();
  private speechRecognitionService: SpeechRecognitionService = new SpeechRecognitionService({} as SpeechRecognition);

  constructor(public speechRecognitionFactory: SpeechRecognitionFactory,
              private changeDetectorTrigger: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.itemsGroupsSource
      .subscribe(itemsGroups => this.speechRecognitionService = this.speechRecognitionFactory.create(this.getAllItemNames(itemsGroups)));
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  recordItemName() {
    if (!this.recordingInProgress) {
      this.recordingInProgress = true;
      this.subscription = this.speechRecognitionService.recognizeWords()
        .pipe(distinct())
        .pipe(map((word: string) => new ItemDescriptor(word, 1, '')))
        .subscribe({
          next: itemDescriptor => this.recorded.emit(itemDescriptor),
          error: (error) => this.handleError(error),
          complete: () => this.finishRecording()
        });
    } else {
      this.speechRecognitionService.stop();
      this.finishRecording();
    }
  }

  private getAllItemNames = (itemsGroups: ItemsGroup[]) => itemsGroups
    .flatMap((itemsGroup) => itemsGroup.items)
    .map(item => item.descriptor.name);
  private handleError(error: Error) {
    console.error(error);
  }

  private finishRecording() {
    this.recordingInProgress = false;
    this.changeDetectorTrigger.detectChanges();
  }
}
