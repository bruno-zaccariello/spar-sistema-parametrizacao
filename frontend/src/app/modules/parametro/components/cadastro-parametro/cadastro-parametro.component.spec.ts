import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroParametroComponent } from './cadastro-parametro.component';

describe('CadastroParametroComponent', () => {
  let component: CadastroParametroComponent;
  let fixture: ComponentFixture<CadastroParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroParametroComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastroParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
