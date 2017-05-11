import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellaritemNewComponent } from './cellaritem-new.component';

describe('CellaritemNewComponent', () => {
  let component: CellaritemNewComponent;
  let fixture: ComponentFixture<CellaritemNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellaritemNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellaritemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
