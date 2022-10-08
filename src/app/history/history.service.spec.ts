import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';
import { Item } from '../list/item.model';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  const buildKey = () => `shopping_history ${new Date().toDateString()}`;

  it('should not add empty list of items', () => {
    //when
    service.addEntry([]);

    //then
    expect(localStorage.getItem(buildKey())).toBeNull();

    //cleanup
    localStorage.removeItem(buildKey());
  });

  it('should add a new list of items', () => {
    //when
    service.addEntry([new Item(1, 'n', 'c', 1)]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"name":"n","category":"c","quantity":1,"note":"","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });

  it('should append to existing list of items', () => {
    //when
    service.addEntry([new Item(1, 'n', 'c', 1)]);
    service.addEntry([new Item(2, 'a', 'c', 2)]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"name":"n","category":"c","quantity":1,"note":"","state":"NOT_CHECKED"},{"id":2,"name":"a","category":"c","quantity":2,"note":"","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });

  it('should merge items with the same name', () => {
    //when
    service.addEntry([new Item(1, 'n', 'c', 1, 'no1')]);
    service.addEntry([new Item(1, 'n', 'c', 2, 'no2')]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"name":"n","category":"c","quantity":3,"note":"no1, no2","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });
});
