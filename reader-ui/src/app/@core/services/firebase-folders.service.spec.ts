import { TestBed } from '@angular/core/testing';

import { FirebaseFoldersService } from './firebase-folders.service';

describe('FirebaseFoldersService', () => {
  let service: FirebaseFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
