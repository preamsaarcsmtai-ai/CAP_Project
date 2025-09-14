import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Institution } from './institution';

describe('Institution', () => {
  let component: Institution;
  let fixture: ComponentFixture<Institution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Institution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Institution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
