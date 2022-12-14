import {TestBed} from '@angular/core/testing';

import {DescriptorParserService} from './descriptor-parser.service';

describe('DescriptorParser', () => {
  let service: DescriptorParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(DescriptorParserService);
  });

  it('should return empty list for empty test', () => {
    //given
    const text = '';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(0);
  });

  it('should return list for single line test', () => {
    //given
    const text = 'Banany';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(1);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(1);
    expect(itemsDescriptors[0].note).toEqual('');
  });

  it('should return list for multiline test', () => {
    //given
    const text = 'Banany\nChleb';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(2);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(1);
    expect(itemsDescriptors[0].note).toEqual('');
    expect(itemsDescriptors[1].name).toEqual('Chleb');
    expect(itemsDescriptors[1].quantity).toEqual(1);
    expect(itemsDescriptors[1].note).toEqual('');
  });

  it('should parse quantity 1x', () => {
    //given
    const text = 'Banany 1x';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(1);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(1);
    expect(itemsDescriptors[0].note).toEqual('');
  });

  it('should parse quantity 5x', () => {
    //given
    const text = 'Banany 5x';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(1);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(5);
    expect(itemsDescriptors[0].note).toEqual('');
  });

  it('should parse note', () => {
    //given
    const text = 'Banany (bio)';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(1);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(1);
    expect(itemsDescriptors[0].note).toEqual('bio');
  });

  it('should parse quantity and note', () => {
    //given
    const text = 'Banany 5x (bio)';

    //when
    const itemsDescriptors = service.parse(text);

    //then
    expect(itemsDescriptors.length).toEqual(1);
    expect(itemsDescriptors[0].name).toEqual('Banany');
    expect(itemsDescriptors[0].quantity).toEqual(5);
    expect(itemsDescriptors[0].note).toEqual('bio');
  });

  it('should always parse the same text identically', () => {
    //given
    const text = 'Banany 5x';

    //when
    const itemsDescriptors1 = service.parse(text);
    const itemsDescriptors2 = service.parse(text);

    //then
    expect(itemsDescriptors1.length).toEqual(1);
    expect(itemsDescriptors2.length).toEqual(1);
    expect(itemsDescriptors1[0].name).toEqual(itemsDescriptors2[0].name);
    expect(itemsDescriptors1[0].quantity).toEqual(itemsDescriptors2[0].quantity);
    expect(itemsDescriptors1[0].note).toEqual(itemsDescriptors2[0].note);
  });
});
