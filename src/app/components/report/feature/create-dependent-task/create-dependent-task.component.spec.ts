import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDependentTaskComponent } from './create-dependent-task.component';

describe('CreateDependentTaskComponent', () => {
  let component: CreateDependentTaskComponent;
  let fixture: ComponentFixture<CreateDependentTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDependentTaskComponent]
    });
    fixture = TestBed.createComponent(CreateDependentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
