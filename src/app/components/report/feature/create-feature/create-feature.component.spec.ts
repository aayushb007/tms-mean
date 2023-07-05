import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeatureComponent } from './create-feature.component';

describe('CreateFeatureComponent', () => {
  let component: CreateFeatureComponent;
  let fixture: ComponentFixture<CreateFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFeatureComponent]
    });
    fixture = TestBed.createComponent(CreateFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
