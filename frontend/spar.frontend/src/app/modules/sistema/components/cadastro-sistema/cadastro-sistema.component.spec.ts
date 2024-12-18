import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSistemaComponent } from './cadastro-sistema.component';

describe('CadastroSistemaComponent', () => {
  let component: CadastroSistemaComponent;
  let fixture: ComponentFixture<CadastroSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroSistemaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastroSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
