import {TestBed} from '@angular/core/testing';

import {HistoryService} from './history.service';
import {Item} from '../list/item.model';
import {ItemDescriptor} from "../list/item-descriptor.model";

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
    service.addEntry([new Item(1, new ItemDescriptor('n', 1), 'c')]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"descriptor":{"name":"n","quantity":1,"note":""},"category":"c","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });

  it('should append to existing list of items', () => {
    //when
    service.addEntry([new Item(1, new ItemDescriptor('n', 1), 'c')]);
    service.addEntry([new Item(2, new ItemDescriptor('a', 2), 'c')]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"descriptor":{"name":"n","quantity":1,"note":""},"category":"c","state":"NOT_CHECKED"},{"id":2,"descriptor":{"name":"a","quantity":2,"note":""},"category":"c","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });

  it('should merge items with the same name', () => {
    //when
    service.addEntry([new Item(1, new ItemDescriptor('n', 1, 'no1'), 'c')]);
    service.addEntry([new Item(1, new ItemDescriptor('n', 2, 'no2'), 'c')]);

    //then
    expect(localStorage.getItem(buildKey())).toEqual(
      '[{"id":1,"descriptor":{"name":"n","quantity":2,"note":"no2"},"category":"c","state":"NOT_CHECKED"}]'
    );

    //cleanup
    localStorage.removeItem(buildKey());
  });
});
