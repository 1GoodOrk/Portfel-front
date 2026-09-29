import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButterflyMethodComponent } from './butterfly-method.component';

describe('ButterflyMethodComponent', () => {
  let component: ButterflyMethodComponent;
  let fixture: ComponentFixture<ButterflyMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButterflyMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButterflyMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
