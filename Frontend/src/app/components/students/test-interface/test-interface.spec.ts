import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInterface } from './test-interface';

describe('Test', () => {
  let component: TestInterface;
  let fixture: ComponentFixture<TestInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInterface]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestInterface);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
