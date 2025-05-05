import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployabilityComponent } from './employability.component';

describe('EmployabilityComponent', () => {
  let component: EmployabilityComponent;
  let fixture: ComponentFixture<EmployabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
