import {Item} from '../list/item.model';
import {HistoryEntry} from './history.entry.model';
import {ItemDescriptor} from "../list/item-descriptor.model";

describe('HistoryEntry', () => {
  it('should ignore empty list', () => {
    //given
    const historyEntry = new HistoryEntry(
      'key',
      [new Item(1, new ItemDescriptor('n', 1), 'c')],
      false
    );

    //when
    const updatedHistoryEntry = historyEntry.appendItems([]);

    //then
    expect(updatedHistoryEntry.value.length).toEqual(1);
  });

  it('should append item which is not on the list', () => {
    //given
    const historyEntry = new HistoryEntry(
      'key',
      [new Item(1, new ItemDescriptor('n', 1), 'c')],
      false
    );

    //when
    const updatedHistoryEntry = historyEntry.appendItems([
      new Item(2, new ItemDescriptor('o', 1), 'c')
    ]);

    //then
    expect(updatedHistoryEntry.value.length).toEqual(2);
  });

  it('should append item which is on the list', () => {
    //given
    const historyEntry = new HistoryEntry(
      'key',
      [new Item(1, new ItemDescriptor('n', 1, 'no1'), 'c')],
      false
    );

    //when
    const updatedHistoryEntry = historyEntry.appendItems([
      new Item(1, new ItemDescriptor('n', 2, 'no2'), 'c')
    ]);

    //then
    expect(updatedHistoryEntry.value.length).toEqual(1);
    expect(updatedHistoryEntry.value[0].id).toEqual(1);
    expect(updatedHistoryEntry.value[0].descriptor.name).toEqual('n');
    expect(updatedHistoryEntry.value[0].category).toEqual('c');
    expect(updatedHistoryEntry.value[0].descriptor.quantity).toEqual(2);
    expect(updatedHistoryEntry.value[0].descriptor.note).toEqual('no2');
  });
});
