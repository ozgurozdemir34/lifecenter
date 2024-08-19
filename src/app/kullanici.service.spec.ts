import { TestBed } from '@angular/core/testing';

import { kullanici } from './kullanici.service';

describe('KullaniciService', () => {
  let service: kullanici;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(kullanici);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
