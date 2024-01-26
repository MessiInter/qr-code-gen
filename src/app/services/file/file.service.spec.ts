/**
 * @jest-environment jsdom
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
