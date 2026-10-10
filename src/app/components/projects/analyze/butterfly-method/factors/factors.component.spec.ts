import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorsComponent } from './factors.component';

describe('FactorsComponent', () => {
  let component: FactorsComponent;
  let fixture: ComponentFixture<FactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
