import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackholderBalanceComponent } from './stackholder.component';

describe('StackholderBalanceComponent', () => {
  let component: StackholderBalanceComponent;
  let fixture: ComponentFixture<StackholderBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackholderBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackholderBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
