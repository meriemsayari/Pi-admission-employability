import { ComponentFixture, TestBed } from '@angular/core/testing';

import { copyComponent } from './copy.component';

describe('copyComponent', () => {
  let component: copyComponent;
  let fixture: ComponentFixture<copyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [copyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(copyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
