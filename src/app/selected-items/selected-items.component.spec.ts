import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedItemsComponent} from './selected-items.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LoaderService} from "../loader.service";
import {ListService} from "../list/list.service";
import {of} from "rxjs";
import {ItemsGroup} from "../items-groups/items-group.model";
import {Item} from "../list/item.model";
import {ItemDescriptor} from "../list/item-descriptor.model";

describe('SelectedItemsComponent', () => {
  let component: SelectedItemsComponent;
  let fixture: ComponentFixture<SelectedItemsComponent>;
  let loaderService: any;
  let listService: any;

  beforeEach(async () => {
    loaderService = jasmine.createSpyObj('LoaderService', ['load']);
    listService = jasmine.createSpyObj('ListService', ['select']);

    loaderService.load.and.returnValue(of([new ItemsGroup('owoce', [new Item(new ItemDescriptor('jabłko', 0), 'owoce')])]));

    await TestBed.configureTestingModule({
      declarations: [SelectedItemsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: LoaderService, useValue: loaderService},
        {provide: ListService, useValue: listService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    //when
    fixture.detectChanges();

    //then
    expect(component).toBeTruthy();
  });
});
