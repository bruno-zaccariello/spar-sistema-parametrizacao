import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheParametroComponent } from './detalhe-parametro.component';

describe('DetalheParametroComponent', () => {
  let component: DetalheParametroComponent;
  let fixture: ComponentFixture<DetalheParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheParametroComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetalheParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
