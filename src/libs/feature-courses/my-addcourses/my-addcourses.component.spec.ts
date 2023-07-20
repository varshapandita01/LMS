import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddcoursesComponent } from './my-addcourses.component';

describe('MyAddcoursesComponent', () => {
  let component: MyAddcoursesComponent;
  let fixture: ComponentFixture<MyAddcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAddcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
