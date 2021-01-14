import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntwortverteilungDialogComponent } from './antwortverteilung-dialog.component';

describe('AntwortverteilungDialogComponent', () => {
  let component: AntwortverteilungDialogComponent;
  let fixture: ComponentFixture<AntwortverteilungDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntwortverteilungDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntwortverteilungDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
