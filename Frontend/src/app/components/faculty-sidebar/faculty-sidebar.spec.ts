import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySidebar } from './faculty-sidebar';

describe('FacultySidebar', () => {
  let component: FacultySidebar;
  let fixture: ComponentFixture<FacultySidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultySidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultySidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
