/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file will be used to test the
 * URL service
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
