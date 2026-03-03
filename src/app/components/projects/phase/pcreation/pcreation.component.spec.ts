import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcreationComponent } from './pcreation.component';

describe('PcreationComponent', () => {
  let component: PcreationComponent;
  let fixture: ComponentFixture<PcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
