import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellaritemEditComponent } from './cellaritem-edit.component';

describe('CellaritemEditComponent', () => {
  let component: CellaritemEditComponent;
  let fixture: ComponentFixture<CellaritemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellaritemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellaritemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
