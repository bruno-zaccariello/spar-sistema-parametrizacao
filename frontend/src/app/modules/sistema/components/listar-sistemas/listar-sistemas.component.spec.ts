/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSistemasComponent } from './listar-sistemas.component';

describe('ListarSistemasComponent', () => {
  let component: ListarSistemasComponent;
  let fixture: ComponentFixture<ListarSistemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarSistemasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
