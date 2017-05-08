import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarEditComponent } from './cellar-edit.component';

describe('CellarEditComponent', () => {
  let component: CellarEditComponent;
  let fixture: ComponentFixture<CellarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
