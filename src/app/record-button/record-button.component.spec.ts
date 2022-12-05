import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordButtonComponent} from './record-button.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('RecordButtonComponent', () => {
  let component: RecordButtonComponent;
  let fixture: ComponentFixture<RecordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // when
    fixture.detectChanges();

    // then
    expect(component).toBeTruthy();
  });
});
