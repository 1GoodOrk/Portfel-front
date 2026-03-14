import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanalyzeComponent } from './panalyze.component';

describe('PanalyzeComponent', () => {
  let component: PanalyzeComponent;
  let fixture: ComponentFixture<PanalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
