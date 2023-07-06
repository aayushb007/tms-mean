import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBugComponent } from './list-bug.component';

describe('ListBugComponent', () => {
  let component: ListBugComponent;
  let fixture: ComponentFixture<ListBugComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBugComponent]
    });
    fixture = TestBed.createComponent(ListBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
