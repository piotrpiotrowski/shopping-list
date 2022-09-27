import {Injectable} from '@angular/core';
import {Item} from "../item-button/item.model";
import {Clipboard} from '@angular/cdk/clipboard';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, from, groupBy, map, mergeMap, Observable, of, tap, toArray, zip} from "rxjs";
import {ItemsGroup} from "../items-groups/items-group.model";
import {ItemEvent} from "../item-button/item-event.model";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private itemsGroups: ItemsGroup[] = [];

  private readonly UNKNOWN = 'nieznane';

  constructor(private clipboard: Clipboard, private http: HttpClient) {
  }

  getSelectedItems() {
    return this.itemsGroups.reduce((accumulator, itemsGroup) => accumulator.concat(itemsGroup.filterSelected()), new Array<Item>());
  }

  append(itemEvent: ItemEvent) {
    const textInLines = this.getSelectedItems().map(item => item.asString()).join('\n');
    this.clipboard.copy(textInLines);
  }

  loadItemsGroups(): Observable<ItemsGroup[]> {
    if (this.itemsGroups.length > 0) {
      return of(this.itemsGroups);
    }
    const headers = new HttpHeaders().set('Content-Type', 'text/csv; charset=utf-8');
    return this.http.get("/api/db.csv", {headers, responseType: 'text'})
      .pipe(mergeMap(value => from(value.split('\n'))))
      .pipe(filter(value => value.length > 0))
      .pipe(map(value => this.convertToItem(value)))
      .pipe(groupBy(
        item => item.category,
        {element: p => p}
      ))
      .pipe(mergeMap(group => zip(of(group.key), group.pipe(toArray()))))
      .pipe(map(entry => new ItemsGroup(entry[0], this.sortByName(entry[1]))))
      .pipe(toArray())
      .pipe(map(itemsGroups => this.sortByCategory(itemsGroups)))
      .pipe(tap(itemsGroups => itemsGroups.push(new ItemsGroup(this.UNKNOWN, []))))
      .pipe(tap(itemsGroups => this.itemsGroups = itemsGroups))
  }

  selectFromText(text: string) {
    text.trim()
      .split('\n')
      .filter(value => value.length > 0)
      .map(line => this.extractAttributes(line))
      .forEach(attributes => this.selectBy(attributes));
  }

  private selectBy(attributes: { quantity: number; name: string }) {
    const item = this.findItem(attributes.name);
    if (item) {
      item.setQuantity(attributes.quantity);
    } else {
      this.getGroupUnknown().items.push(new Item(0, attributes.name, this.UNKNOWN, attributes.quantity));
    }
  }

  private findItem(name: string) {
    return this.itemsGroups
      .map(value => value.findItem(name))
      .find(value => value);
  }

  private getGroupUnknown() {
    return this.itemsGroups[this.itemsGroups.length - 1];
  }

  private extractAttributes(line: string) {
    const quantity = this.extractQuantity(line);
    const name = line.replace(` ${quantity}x`, '')
    return {name: name, quantity: quantity};
  }

  private convertToItem(value: string) {
    const columns = value.split(',');
    return new Item(Number(columns[0]), columns[1], columns[2].trimEnd());
  }

  private sortByName(items: Item[]) {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }

  private sortByCategory(itemsGroups: ItemsGroup[]) {
    return itemsGroups.sort((a, b) => a.name.localeCompare(b.name));
  }

  private extractQuantity(line: string) {
    let value = line.replace(/[a-zA-z ąęłóżźńĄĘŁÓŻŹŃöäüßÖÄÜ]/g, '');
    return value.length > 0 ? Number(value) : 1;
  }
}
