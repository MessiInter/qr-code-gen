/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
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
