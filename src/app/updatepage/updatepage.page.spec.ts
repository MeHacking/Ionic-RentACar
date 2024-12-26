import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatepagePage } from './updatepage.page';

describe('UpdatepagePage', () => {
  let component: UpdatepagePage;
  let fixture: ComponentFixture<UpdatepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
