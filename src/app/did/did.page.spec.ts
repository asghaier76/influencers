import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DidPage } from './did.page';

describe('DidPage', () => {
  let component: DidPage;
  let fixture: ComponentFixture<DidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
