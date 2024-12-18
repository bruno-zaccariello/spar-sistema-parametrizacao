/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheSistemaComponent } from './detalhe-sistema.component';

describe('DetalheSistemaComponent', () => {
  let component: DetalheSistemaComponent;
  let fixture: ComponentFixture<DetalheSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheSistemaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
