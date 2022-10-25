import {Injectable} from '@angular/core';
import {ItemDescriptor} from "../list/item-descriptor.model";

@Injectable({
  providedIn: 'root'
})
export class DescriptorParserService {

  private readonly QUANTITY_EXTRACTION_REGEXP = / (?<quantity>[0-9]+)x/;

  parse = (text: string): ItemDescriptor[] =>
    text.trim()
      .split('\n')
      .filter((value) => value.length > 0)
      .map((line) => this.createItemDescriptor(line));

  private createItemDescriptor(line: string) {
    const quantity = this.extractQuantity(line);
    const note = this.extractNote(line);
    const name = line.replace(` ${quantity}x`, '').replace(` (${note})`, '');
    return new ItemDescriptor(name, quantity, note);
  }

  private extractQuantity(line: string) {
    const matches = line.match(this.QUANTITY_EXTRACTION_REGEXP)
    return matches && matches[1] ? Number(matches[1]) : 1;
  }

  private extractNote(line: string) {
    const noteBegin = line.indexOf('(');
    const noteEnd = line.indexOf(')');
    return noteBegin === -1 ? '' : line.substring(noteBegin + 1, noteEnd);
  }
}
