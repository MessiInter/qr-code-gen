/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project.
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
