import { ComponentFixture, TestBed } from '@angular/core/testing';

import { companyComponent } from './company.component';

describe('companyComponent', () => {
  let component: companyComponent;
  let fixture: ComponentFixture<companyComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [companyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(companyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
