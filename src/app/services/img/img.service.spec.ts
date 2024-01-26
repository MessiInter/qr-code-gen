/**
 * @jest-environment jsdom
 */

import {TestBed} from '@angular/core/testing';

import {ImgService} from './img.service';

describe('ImgService', () => {
  let service: ImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgService);
  });

  it('image service should be created', () => expect(service).toBeTruthy());

  it('save as image method should exist', () =>
    expect(service.saveAsImage).toBeTruthy());
});
