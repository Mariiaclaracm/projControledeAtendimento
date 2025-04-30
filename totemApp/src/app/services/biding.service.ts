import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AtendimentoEncerrado {
  senha: number | null;
  tipo: string | undefined;
  guiche: string;
}

@Injectable({
  providedIn: 'root'
})
export class BidingService {
  varivavelTeste = "Shalala";

  private _senhaPrioritaria = new BehaviorSubject<number | null>(null);
  public senhaPrioritaria$ = this._senhaPrioritaria.asObservable();

  private _senhaGeral = new BehaviorSubject<number | null>(null);
  public senhaGeral$ = this._senhaGeral.asObservable();

  private _senhaExames = new BehaviorSubject<number | null>(null);
  public senhaExames$ = this._senhaExames.asObservable();

  private _listaDeSenhas = new BehaviorSubject<{ numero: number | null; tipo: string; status?: string }[]>([]);
  public listaDeSenhas$ = this._listaDeSenhas.asObservable();

  private _senhaEmAtendimento = new BehaviorSubject<any>(null);
  public senhaEmAtendimento$ = this._senhaEmAtendimento.asObservable();

  private _guicheEmAtendimento = new BehaviorSubject<string | null>(null);
  public guicheEmAtendimento$ = this._guicheEmAtendimento.asObservable();

  private _guicheAtual = new BehaviorSubject<{ [tipo: string]: string }>({
    'SP': '01',
    'SG': '02',
    'SE': '03',
    'default': '04'
  });
  public guicheAtual$ = this._guicheAtual.asObservable();

  private _historicoAtendimentosEncerrados = new BehaviorSubject<AtendimentoEncerrado[]>([]);
  public historicoAtendimentosEncerrados$ = this._historicoAtendimentosEncerrados.asObservable();

  constructor() { }

  setSenhaPrioritaria(senha: number) {
    this._senhaPrioritaria.next(senha);
  }

  getSenhaPrioritaria(): number | null {
    return this._senhaPrioritaria.value;
  }

  setSenhaGeral(senha: number) {
    this._senhaGeral.next(senha);
  }

  getSenhaGeral(): number | null {
    return this._senhaGeral.value;
  }

  setSenhaExames(senha: number) {
    this._senhaExames.next(senha);
  }

  getSenhaExames(): number | null {
    return this._senhaExames.value;
  }

  adicionarNovaSenha(novaSenha: { numero: number | null; tipo: string }) {
    const listaAtual = this._listaDeSenhas.getValue();
    const novaLista = [...listaAtual, { ...novaSenha, status: 'pendente' }];
    this._listaDeSenhas.next(novaLista);
  }

  setSenhaEmAtendimento(senha: any) {
    this._senhaEmAtendimento.next(senha);
  }

  getSenhaEmAtendimento(): any {
    return this._senhaEmAtendimento.value;
  }
  setGuicheAtual(tipo: string, guiche: string) {
    const guiches = this._guicheAtual.getValue();
    guiches[tipo] = guiche;
    this._guicheAtual.next(guiches);
  }

  getGuicheAtual(tipo: string): string {
    return this._guicheAtual.getValue()[tipo] || this._guicheAtual.getValue()['default'];
  }

  marcarSenhaComoAtendida(senhaAtendida: { numero: number | null; tipo: string }) {
    const listaAtual = this._listaDeSenhas.getValue();
    const index = listaAtual.findIndex(senha => senha.numero === senhaAtendida.numero && senha.tipo === senhaAtendida.tipo);
    if (index > -1) {
      const novaLista = [...listaAtual];
      novaLista[index] = { ...novaLista[index], status: 'atendido' };
      this._listaDeSenhas.next(novaLista);
      console.log('Lista de Senhas após marcar como atendida:', this._listaDeSenhas.getValue());
    }
  }

  atualizarSenhaNaLista(senhaAtualizada: { numero: number | null; tipo: string; status?: string }) {
    const listaAtual = this._listaDeSenhas.getValue();
    const index = listaAtual.findIndex(senha => senha.numero === senhaAtualizada.numero && senha.tipo === senhaAtualizada.tipo);
    if (index > -1) {
      const novaLista = [...listaAtual];
      novaLista[index] = senhaAtualizada;
      this._listaDeSenhas.next(novaLista);
      console.log('Lista de Senhas após atualizar:', this._listaDeSenhas.getValue());
    }
  }

  adicionarAtendimentoEncerrado(atendimento: AtendimentoEncerrado) {
    const historicoAtual = this._historicoAtendimentosEncerrados.getValue();
    this._historicoAtendimentosEncerrados.next([...historicoAtual, atendimento]);
    console.log('Histórico de Atendimentos Encerrados:', this._historicoAtendimentosEncerrados.getValue());
  }

  getProximasSenhas(tipo: string, quantidade: number = 2): { numero: number | null; tipo: string }[] {
    const listaAtual = this._listaDeSenhas.getValue();
    const pendentesDoTipo = listaAtual.filter(senha => senha.tipo.startsWith(tipo) && senha.status === 'pendente');
    return pendentesDoTipo.slice(0, quantidade);
  }

  getUltimoAtendimentoEncerrado(tipo: string): AtendimentoEncerrado | undefined {
    const historico = this._historicoAtendimentosEncerrados.getValue();
    const atendimentosDoTipo = historico.filter(atendimento => atendimento.tipo?.startsWith(tipo));
    return atendimentosDoTipo[atendimentosDoTipo.length - 1];
  }

  setGuicheEmAtendimento(guiche: string | null) {
    this._guicheEmAtendimento.next(guiche);
  }

  getGuicheEmAtendimento(): string | null {
    return this._guicheEmAtendimento.value;
  }
}