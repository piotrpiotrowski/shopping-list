import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGroupsComponent } from './items-groups.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ItemsGroupsComponent', () => {
  let component: ItemsGroupsComponent;
  let fixture: ComponentFixture<ItemsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsGroupsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
