import { ComponentFixture, TestBed } from '@angular/core/testing';

import { empComponent } from './emp.component';

describe('empComponent', () => {
  let component: empComponent;
  let fixture: ComponentFixture<empComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [empComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(empComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
