import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminusers } from './adminusers';

describe('Adminusers', () => {
  let component: Adminusers;
  let fixture: ComponentFixture<Adminusers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminusers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminusers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
