import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemButtonComponent } from './item-button.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatMenuModule} from "@angular/material/menu";

describe('ItemButtonComponent', () => {
  let component: ItemButtonComponent;
  let fixture: ComponentFixture<ItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ ItemButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
