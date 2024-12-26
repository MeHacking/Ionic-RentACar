import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpagePage } from './addpage.page';

describe('AddpagePage', () => {
  let component: AddpagePage;
  let fixture: ComponentFixture<AddpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
