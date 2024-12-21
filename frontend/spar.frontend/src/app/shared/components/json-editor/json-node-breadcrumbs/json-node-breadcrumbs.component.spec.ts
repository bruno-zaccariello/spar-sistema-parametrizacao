import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonNodeBreadcrumbsComponent } from './json-node-breadcrumbs.component';

describe('JsonNodeBreadcrumbsComponent', () => {
  let component: JsonNodeBreadcrumbsComponent;
  let fixture: ComponentFixture<JsonNodeBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonNodeBreadcrumbsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JsonNodeBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
