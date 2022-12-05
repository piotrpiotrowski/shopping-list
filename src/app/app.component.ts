import {Component} from '@angular/core';
import {LoaderService} from "./loader.service";
import {RecordedItemDescriptorService} from "./speech/recorded-item-descriptor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Shopping list';

  constructor(public loaderService: LoaderService, public recordedItemDescriptorService: RecordedItemDescriptorService) {
  }
}
