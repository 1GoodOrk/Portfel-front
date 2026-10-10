import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StairsMethodComponent } from './stairs-method.component';

describe('StairsMethodComponent', () => {
  let component: StairsMethodComponent;
  let fixture: ComponentFixture<StairsMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StairsMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StairsMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
