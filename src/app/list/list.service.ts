import {Injectable} from '@angular/core';
import {Item} from "../item-button/item.model";
import {Clipboard} from '@angular/cdk/clipboard';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {from, map, mergeMap, Observable, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  selectedItems: Item[] = [];

  constructor(private clipboard: Clipboard, private http: HttpClient) {
  }

  append(item: Item) {
    this.selectedItems.push(item);
    const occurrences = this.selectedItems.reduce((map, item) => this.addOccurrenceToMap(map, item), new Map<string, number>());
    const textInLines = [...occurrences.entries()].map(entry => entry[1] == 1 ? entry[0] : `${entry[1]}x${entry[0]}`).join('\n');
    this.clipboard.copy(textInLines);
  }

  private addOccurrenceToMap(map: Map<string, number>, item: Item) {
    map.set(item.name, (map.get(item.name) || 0) + 1)
    return map;
  }

  loadItems(): Observable<Item[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text/csv; charset=utf-8');
    return this.http.get("shopping-list/db.csv", {headers, responseType: 'text'})
      .pipe(mergeMap(value => from(value.split('\n'))))
      .pipe(map(value => {
        const columns = value.split(';');
        return new Item(columns[0], columns[1]);
      }))
      .pipe(toArray());
  }
}
