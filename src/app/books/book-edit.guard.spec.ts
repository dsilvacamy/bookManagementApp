import { TestBed, async, inject } from '@angular/core/testing';

import { BookEditGuard } from './book-edit.guard';

describe('BookEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookEditGuard]
    });
  });

  it('should ...', inject([BookEditGuard], (guard: BookEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
