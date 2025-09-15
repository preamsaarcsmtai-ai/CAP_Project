import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facultydashboard } from './facultydashboard';

describe('Facultydashboard', () => {
  let component: Facultydashboard;
  let fixture: ComponentFixture<Facultydashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Facultydashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Facultydashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
