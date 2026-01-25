import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertisesAnalyzeComponent } from './expertises-analyze.component';

describe('ExpertisesAnalyzeComponent', () => {
  let component: ExpertisesAnalyzeComponent;
  let fixture: ComponentFixture<ExpertisesAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertisesAnalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertisesAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
