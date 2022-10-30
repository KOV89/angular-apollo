import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCellComponent } from './info-cell.component';

describe('InfoCellComponent', () => {
  let component: InfoCellComponent;
  let fixture: ComponentFixture<InfoCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
