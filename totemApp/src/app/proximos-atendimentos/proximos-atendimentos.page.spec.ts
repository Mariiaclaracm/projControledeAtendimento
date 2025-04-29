import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProximosAtendimentosPage } from './proximos-atendimentos.page';

describe('ProximosAtendimentosPage', () => {
  let component: ProximosAtendimentosPage;
  let fixture: ComponentFixture<ProximosAtendimentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosAtendimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
