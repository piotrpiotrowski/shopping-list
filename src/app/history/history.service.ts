import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public readonly HISTORY_BASE_KEY = 'shopping_history';

  constructor() {
  }

  addEntry(text: string) {
    if (text.length === 0) {
      return;
    }
    let key = this.buildKey(new Date());
    localStorage.setItem(key, text);
  }

  getAllEntries(): string[][] {
    return [...Array(30).keys()]
      .map(offset => this.subtractDayFromToday(offset))
      .map(date => this.buildKey(date))
      .filter(key => localStorage.getItem(key))
      .map(key => [key, localStorage.getItem(key) as string]);
  }

  private buildKey = (date: Date) => `${this.HISTORY_BASE_KEY} ${date.toDateString()}`;

  private subtractDayFromToday(offset: number) {
    let today = new Date();
    today.setDate(today.getDate() - offset);
    return today;
  }
}
