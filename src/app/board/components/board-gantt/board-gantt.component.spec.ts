import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGanttComponent } from './board-gantt.component';

describe('BoardGanttComponent', () => {
  let component: BoardGanttComponent;
  let fixture: ComponentFixture<BoardGanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
