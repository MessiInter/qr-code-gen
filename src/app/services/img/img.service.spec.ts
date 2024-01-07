import { TestBed } from '@angular/core/testing';

import { ImgService } from './img.service';

describe('ImgService', () => {
  let service: ImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgService);
  });

  it('img service should be created', () => {
    expect(service).toBeTruthy();
  });
});
