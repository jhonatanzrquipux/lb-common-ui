import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongPollingComponent } from './long-polling.component';

describe('LongPollingComponent', () => {
  let component: LongPollingComponent;
  let fixture: ComponentFixture<LongPollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongPollingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LongPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
