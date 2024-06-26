/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * THis file will be used to test the file service
 */

import {TestBed} from '@angular/core/testing';

import {FileService} from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('file service should be created', () => expect(service).toBeTruthy());

  it('generate filename method should exist', () =>
    expect(service.generateFilename).toBeTruthy());
});
