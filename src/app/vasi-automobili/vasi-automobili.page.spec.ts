import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VasiAutomobiliPage } from './vasi-automobili.page';

describe('VasiAutomobiliPage', () => {
  let component: VasiAutomobiliPage;
  let fixture: ComponentFixture<VasiAutomobiliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VasiAutomobiliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
