import {Injectable} from '@angular/core';
import {Item} from "../list/item.model";
import {HistoryEntry} from "./history.entry.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public readonly HISTORY_BASE_KEY = 'shopping_history';

  constructor() {
  }

  addEntry(items: Item[]) {
    if (items.length === 0) {
      return;
    }
    let key = this.buildKey(new Date());
    if (localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(this.merge(key, items)));
    } else {
      localStorage.setItem(key, JSON.stringify(items));
    }
  }

  private merge(key: string, items: Item[]) {
    return this.getByKey(key).value.concat(items);
  }

  getAllEntries = () =>
    [...Array(30).keys()]
      .map(offset => this.subtractDayFromToday(offset))
      .map(date => this.buildKey(date))
      .filter(key => localStorage.getItem(key))
      .map(key => this.getByKey(key));

  private getByKey = (key: string) => new HistoryEntry(key, this.toItems(localStorage.getItem(key) as string), false)

  private toItems = (jsonText: string) => (JSON.parse(jsonText) as Item[])
    .map(object => new Item(object.id, object.name, object.category, object.quantity, object.note, object.state));

  private buildKey = (date: Date) => `${this.HISTORY_BASE_KEY} ${date.toDateString()}`;

  private subtractDayFromToday(offset: number) {
    let today = new Date();
    today.setDate(today.getDate() - offset);
    return today;
  }
}
