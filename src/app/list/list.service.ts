import {Injectable} from '@angular/core';
import {Item} from './item.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, from, groupBy, map, mergeMap, Observable, of, tap, toArray, zip} from 'rxjs';
import {ItemsGroup} from '../items-groups/items-group.model';
import {ItemDescriptor} from "./item-descriptor.model";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private itemsGroups: ItemsGroup[] = [];

  private readonly UNKNOWN = 'nieznane';

  constructor(private http: HttpClient) {
  }

  getSelectedItems = () =>
    this.itemsGroups.flatMap((itemsGroup) => itemsGroup.filterSelected());

  loadItemsGroups(): Observable<ItemsGroup[]> {
    if (this.itemsGroups.length > 0) {
      return of(this.itemsGroups);
    }
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/csv; charset=utf-8'
    );
    return this.http
      .get('/api/db.csv', {headers, responseType: 'text'})
      .pipe(mergeMap((text) => from(text.split('\n'))))
      .pipe(filter((row) => row.length > 0))
      .pipe(map((row, index) => this.convertToItem(row, index + 1)))
      .pipe(groupBy((item) => item.category, {element: (p) => p}))
      .pipe(mergeMap((group) => zip(of(group.key), group.pipe(toArray()))))
      .pipe(map((entry) => new ItemsGroup(entry[0], this.sortByName(entry[1]))))
      .pipe(toArray())
      .pipe(map((itemsGroups) => this.sortByCategory(itemsGroups)))
      .pipe(
        tap((itemsGroups) => itemsGroups.push(new ItemsGroup(this.UNKNOWN, [])))
      )
      .pipe(tap((itemsGroups) => (this.itemsGroups = itemsGroups)));
  }

  select(itemsDescriptors: ItemDescriptor[]) {
    itemsDescriptors.forEach((attributes) => this.selectBy(attributes));
  }

  public getItemsAsText = () =>
    this.getSelectedItems()
      .map((item) => item.asString())
      .join('\n');

  private selectBy(itemDescriptor: ItemDescriptor) {
    const item = this.findItem(itemDescriptor.name);
    if (item) {
      item.setQuantity(itemDescriptor.quantity);
      item.addNote(itemDescriptor.note);
    } else {
      this.getGroupUnknown().items.push(
        new Item(0, itemDescriptor, this.UNKNOWN)
      );
    }
  }

  private findItem(name: string) {
    return this.itemsGroups
      .map((value) => value.findItem(name))
      .find((value) => value);
  }

  private getGroupUnknown() {
    return this.itemsGroups[this.itemsGroups.length - 1];
  }

  private convertToItem(row: string, id: number) {
    const columns = row.split(',');
    return new Item(id, new ItemDescriptor(columns[0], 0), columns[1].trimEnd());
  }

  private sortByName(items: Item[]) {
    return items.sort((a, b) => a.descriptor.name.localeCompare(b.descriptor.name));
  }

  private sortByCategory(itemsGroups: ItemsGroup[]) {
    return itemsGroups.sort((a, b) => a.name.localeCompare(b.name));
  }
}
