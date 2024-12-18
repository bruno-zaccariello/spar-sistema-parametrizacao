/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SistemaService } from './sistema.service';

describe('Service: Sistema', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SistemaService]
    });
  });

  it('should ...', inject([SistemaService], (service: SistemaService) => {
    expect(service).toBeTruthy();
  }));
});
