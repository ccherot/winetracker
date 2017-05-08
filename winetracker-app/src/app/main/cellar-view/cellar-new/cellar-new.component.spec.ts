import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarNewComponent } from './cellar-new.component';

describe('CellarNewComponent', () => {
  let component: CellarNewComponent;
  let fixture: ComponentFixture<CellarNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellarNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
