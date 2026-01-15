import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialogExpertiseComponent } from './info-expertise-dialog.component';

describe('InfoDialogExpertiseComponent', () => {
  let component: InfoDialogExpertiseComponent;
  let fixture: ComponentFixture<InfoDialogExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDialogExpertiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDialogExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
