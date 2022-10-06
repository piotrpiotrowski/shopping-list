import {TestBed} from '@angular/core/testing';

import {ListService} from './list.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
