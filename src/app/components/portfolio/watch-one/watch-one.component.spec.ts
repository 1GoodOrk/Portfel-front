import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchOneComponent } from './watch-one.component';

describe('WatchOneComponent', () => {
  let component: WatchOneComponent;
  let fixture: ComponentFixture<WatchOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
