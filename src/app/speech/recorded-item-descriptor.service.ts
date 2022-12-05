import {EventEmitter, Injectable} from '@angular/core';
import {ItemDescriptor} from "../list/item-descriptor.model";

@Injectable({
  providedIn: 'root'
})
export class RecordedItemDescriptorService {

  private published = new EventEmitter<ItemDescriptor>();

  public publish(itemDescriptor: ItemDescriptor) {
    this.published.emit(itemDescriptor);
  }

  public get = () => this.published;
}
