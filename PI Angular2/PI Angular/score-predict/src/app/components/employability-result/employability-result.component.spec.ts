import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployabilityResultComponent } from './employability-result.component';

describe('EmployabilityResultComponent', () => {
  let component: EmployabilityResultComponent;
  let fixture: ComponentFixture<EmployabilityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployabilityResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployabilityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
