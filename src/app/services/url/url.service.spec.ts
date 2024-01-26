/**
 * @jest-environment jsdom
 */

import {TestBed} from '@angular/core/testing';

import {UrlService} from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlService);
  });

  it('url service should be created', () => expect(service).toBeTruthy());

  it('convert base64 to blob method should exist', () =>
    expect(service.base64ToBlob).toBeTruthy());
});
