import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyregisterationpageComponent } from './myregisterationpage.component';

describe('MyregisterationpageComponent', () => {
  let component: MyregisterationpageComponent;
  let fixture: ComponentFixture<MyregisterationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyregisterationpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyregisterationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
