import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubTaskComponent } from './create-sub-task.component';

describe('CreateSubTaskComponent', () => {
  let component: CreateSubTaskComponent;
  let fixture: ComponentFixture<CreateSubTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubTaskComponent]
    });
    fixture = TestBed.createComponent(CreateSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
