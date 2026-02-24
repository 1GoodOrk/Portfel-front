import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLDComponent } from './cld.component';

describe('CLDComponent', () => {
  let component: CLDComponent;
  let fixture: ComponentFixture<CLDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
