import { Item } from '../list/item.model';
import { HistoryEntry } from './history.entry.model';

describe('HistoryEntry', () => {
  it('should ignore empty list', () => {
    //given
    const historyEntry = new HistoryEntry(
      'key',
      [new Item(1, 'n', 'c', 1)],
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
      [new Item(1, 'n', 'c', 1)],
      false
    );

    //when
    const updatedHistoryEntry = historyEntry.appendItems([
      new Item(2, 'o', 'c', 1)
    ]);

    //then
    expect(updatedHistoryEntry.value.length).toEqual(2);
  });

  it('should append item which is on the list', () => {
    //given
    const historyEntry = new HistoryEntry(
      'key',
      [new Item(1, 'n', 'c', 1, 'no1')],
      false
    );

    //when
    const updatedHistoryEntry = historyEntry.appendItems([
      new Item(1, 'n', 'c', 2, 'no2')
    ]);

    //then
    expect(updatedHistoryEntry.value.length).toEqual(1);
    expect(updatedHistoryEntry.value[0].id).toEqual(1);
    expect(updatedHistoryEntry.value[0].name).toEqual('n');
    expect(updatedHistoryEntry.value[0].category).toEqual('c');
    expect(updatedHistoryEntry.value[0].quantity).toEqual(3);
    expect(updatedHistoryEntry.value[0].note).toEqual('no1, no2');
  });
});
