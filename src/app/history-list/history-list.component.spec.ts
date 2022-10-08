import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryListComponent} from './history-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HistoryService} from "../history/history.service";
import {Clipboard} from '@angular/cdk/clipboard';
import {HistoryEntry} from "../history/history.entry.model";
import {Item} from "../list/item.model";
import {By} from "@angular/platform-browser";
import {MatMenuModule} from "@angular/material/menu";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuHarness} from "@angular/material/menu/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {ItemDescriptor} from "../list/item-descriptor.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HistoryListComponent', () => {

  let historyService: any;
  let clipboard: any;
  let fixture: ComponentFixture<HistoryListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    historyService = jasmine.createSpyObj('HistoryService', ['getAllEntries', 'addEntry']);
    clipboard = jasmine.createSpyObj('Clipboard', ['copy']);

    await TestBed.configureTestingModule({
      declarations: [HistoryListComponent],
      imports: [MatMenuModule, NoopAnimationsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: HistoryService, useValue: historyService},
        {provide: Clipboard, useValue: clipboard}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should do nothing for empty list of history entries', () => {
    //given
    historyService.getAllEntries.and.returnValue([]);

    //when
    fixture.detectChanges();

    //then
    expect(fixture.nativeElement.querySelectorAll('.entry').length).toEqual(0);
  });

  it('should display a list of history entries', () => {
    //given
    historyService.getAllEntries.and.returnValue([new HistoryEntry("today", [], false), new HistoryEntry("yesterday", [], false)]);

    //when
    fixture.detectChanges();

    //then
    expect(fixture.nativeElement.querySelectorAll('.entry').length).toEqual(2);
  });

  it('should display a shopping list when a history entry was clicked', () => {
    //given
    const historyEntry = new HistoryEntry("today", [new Item(new ItemDescriptor('n', 1), 'c'), new Item(new ItemDescriptor('o', 3), 'c')], false);
    historyService.getAllEntries.and.returnValue([historyEntry]);

    //when
    fixture.detectChanges();

    //then
    let historyEntries = fixture.nativeElement.querySelectorAll('.entry');
    expect(historyEntries.length).toEqual(1);

    //when
    fixture.debugElement.query(By.css('button'))
      .triggerEventHandler('click', historyEntry);

    //and
    fixture.detectChanges();

    //then
    expect(historyEntries[0].querySelectorAll('.item-line').length).toEqual(2);
  });

  it('should show more_vert icon when a history entry was clicked', () => {
    //given
    const historyEntry = new HistoryEntry("today", [new Item(new ItemDescriptor('n', 1), 'c'), new Item(new ItemDescriptor('o', 3), 'c')], false);
    historyService.getAllEntries.and.returnValue([historyEntry]);

    //when
    fixture.detectChanges();

    //then
    let historyEntries = fixture.nativeElement.querySelectorAll('.entry');
    expect(historyEntries.length).toEqual(1);

    //when
    fixture.debugElement.query(By.css('button'))
      .triggerEventHandler('click', historyEntry);

    //and
    fixture.detectChanges();

    //then
    expect(historyEntries[0].querySelector('mat-icon').textContent).toEqual(' more_vert ');
  });

  it('should open menu when a more_vert icon was clicked', async () => {
    //given
    const historyEntry = new HistoryEntry("today", [new Item(new ItemDescriptor('n', 1), 'c'), new Item(new ItemDescriptor('o', 3), 'c')], false);
    historyService.getAllEntries.and.returnValue([historyEntry]);

    //when
    fixture.detectChanges();

    //then
    let historyEntries = fixture.nativeElement.querySelectorAll('.entry');
    expect(historyEntries.length).toEqual(1);

    //when
    fixture.debugElement.query(By.css('button'))
      .triggerEventHandler('click', historyEntry);

    //and
    fixture.detectChanges();

    //and
    fixture.debugElement.query(By.css('.entry-actions'))
      .triggerEventHandler('click', {});

    //and
    fixture.detectChanges();

    //then
    let matMenuHarness = await loader.getHarness(MatMenuHarness);
    let items = await matMenuHarness.getItems();
    expect(await items[0].getText()).toEqual('file_copyCopy to clipboard');
    expect(await items[1].getText()).toEqual('fast_forwardContinue');
    expect(await items[2].getText()).toEqual('replayLoad again');
  });

  it('should copy to clipboard when a copy menu option was clicked', async () => {
    //given
    const historyEntry = new HistoryEntry("today", [new Item(new ItemDescriptor('n', 1), 'c'), new Item(new ItemDescriptor('o', 3), 'c')], false);
    historyService.getAllEntries.and.returnValue([historyEntry]);

    //when
    fixture.detectChanges();

    //then
    let historyEntries = fixture.nativeElement.querySelectorAll('.entry');
    expect(historyEntries.length).toEqual(1);

    //when
    fixture.debugElement.query(By.css('button'))
      .triggerEventHandler('click', historyEntry);

    //and
    fixture.detectChanges();

    //and
    fixture.debugElement.query(By.css('.entry-actions'))
      .triggerEventHandler('click', {});

    //and
    fixture.detectChanges();

    //and
    let matMenuHarness = await loader.getHarness(MatMenuHarness);
    let items = await matMenuHarness.getItems();
    await items[0].click();

    //then
    expect(clipboard.copy).toHaveBeenCalledWith('n\no 3x');
  });
});
