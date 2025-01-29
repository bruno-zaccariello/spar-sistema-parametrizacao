import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonNodeActionsComponent } from './json-node-actions.component';

describe('JsonNodeActionsComponent', () => {
  let component: JsonNodeActionsComponent;
  let fixture: ComponentFixture<JsonNodeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonNodeActionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JsonNodeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
