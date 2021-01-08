import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragebogenListeComponent } from './fragebogen-liste.component';

describe('FragebogenListeComponent', () => {
  let component: FragebogenListeComponent;
  let fixture: ComponentFixture<FragebogenListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragebogenListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FragebogenListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
