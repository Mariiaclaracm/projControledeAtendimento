import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private _listaDeSenhas = new BehaviorSubject<{ numero: number | null; tipo: string }[]>([]);
  public listaDeSenhas$ = this._listaDeSenhas.asObservable();

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
    this._listaDeSenhas.next([...listaAtual, novaSenha]);
  }
}

