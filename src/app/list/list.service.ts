import {Injectable} from '@angular/core';
import {Item} from "../item-button/item.model";
import {Clipboard} from '@angular/cdk/clipboard';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {filter, from, groupBy, map, mergeMap, Observable, of, toArray, zip} from "rxjs";
import {ItemsGroup} from "../items-groups/items-group.model";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  selectedItems: Item[] = [];

  constructor(private clipboard: Clipboard, private http: HttpClient) {
  }

  append(item: Item) {
    this.selectedItems.push(item);
    this.selectedItems.sort((a, b) => a.category.localeCompare(b.category));
    const occurrences = this.selectedItems.reduce((map, item) => this.addOccurrenceToMap(map, item), new Map<string, number>());
    const textInLines = [...occurrences.entries()].map(entry => entry[1] == 1 ? entry[0] : `${entry[0]} ${entry[1]}x`).join('\n');
    this.clipboard.copy(textInLines);
  }

  loadItems(): Observable<ItemsGroup[]> {
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
  }

  private addOccurrenceToMap(map: Map<string, number>, item: Item) {
    map.set(item.name, (map.get(item.name) || 0) + 1)
    return map;
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
}
