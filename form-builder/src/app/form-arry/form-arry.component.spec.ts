import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArryComponent } from './form-arry.component';

describe('FormArryComponent', () => {
  let component: FormArryComponent;
  let fixture: ComponentFixture<FormArryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormArryComponent]
    });
    fixture = TestBed.createComponent(FormArryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
