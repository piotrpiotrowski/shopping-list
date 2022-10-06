import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedItemsComponent} from './selected-items.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SelectedItemsComponent', () => {
  let component: SelectedItemsComponent;
  let fixture: ComponentFixture<SelectedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SelectedItemsComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
