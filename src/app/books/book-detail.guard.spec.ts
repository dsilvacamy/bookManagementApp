import { TestBed, async, inject } from '@angular/core/testing';

import { BookDetailGuard } from './book-detail.guard';

describe('BookDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDetailGuard]
    });
  });

  it('should ...', inject([BookDetailGuard], (guard: BookDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
