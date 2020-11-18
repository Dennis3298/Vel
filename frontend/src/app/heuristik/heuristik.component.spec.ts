import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeuristikComponent } from './heuristik.component';

describe('HeuristikComponent', () => {
  let component: HeuristikComponent;
  let fixture: ComponentFixture<HeuristikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeuristikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeuristikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
