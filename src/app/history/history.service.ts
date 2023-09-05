import {Injectable} from '@angular/core';
import {Item} from '../list/item.model';
import {HistoryEntry} from './history.entry.model';
import {ItemDescriptor} from "../list/item-descriptor.model";

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
      this.appendToExistingEntry(key, items);
    } else {
      localStorage.setItem(key, JSON.stringify(items));
    }
  }

  getAllEntries = () =>
    [...Array(180).keys()]
      .map((offset) => this.subtractDayFromToday(offset))
      .map((date) => this.buildKey(date))
      .filter((key) => localStorage.getItem(key))
      .map((key) => this.getByKey(key));

  private appendToExistingEntry(key: string, items: Item[]) {
    let historyEntry = this.getByKey(key).appendItems(items);
    localStorage.setItem(historyEntry.key, JSON.stringify(historyEntry.value));
  }

  private getByKey = (key: string) =>
    new HistoryEntry(
      key,
      this.toItems(localStorage.getItem(key) as string),
      false
    );

  private toItems = (jsonText: string) =>
    (JSON.parse(jsonText) as Item[]).map(
      (object) =>
        new Item(
          new ItemDescriptor(object.descriptor.name, object.descriptor.quantity, object.descriptor.note),
          object.category,
          object.state,
          object.weight
        )
    );

  private buildKey = (date: Date) =>
    `${this.HISTORY_BASE_KEY} ${date.toDateString()}`;

  private subtractDayFromToday(offset: number) {
    let today = new Date();
    today.setDate(today.getDate() - offset);
    return today;
  }
}
