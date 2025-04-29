import { Component, OnInit, OnDestroy } from '@angular/core';
import { BidingService } from "../services/biding.service";
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {
  filtroAtual: string = 'todos';
  listaDeSenhasExibida: { numero: number | null; tipo: string }[] = [];
  private listaDeSenhasSubscription: Subscription | undefined;

  senhaPrioritariaAtual: number | null = null;
  senhaGeralAtual: number | null = null;
  senhaExamesAtual: number | null = null;
  private senhaPrioritariaSubscription: Subscription | undefined;
  private senhaGeralSubscription: Subscription | undefined;
  private senhaExamesSubscription: Subscription | undefined;

  constructor(private bidingService: BidingService, private navCtrl: NavController) { }

  ngOnInit() {
    this.senhaPrioritariaSubscription = this.bidingService.senhaPrioritaria$.subscribe(senha => this.senhaPrioritariaAtual = senha);
    this.senhaGeralSubscription = this.bidingService.senhaGeral$.subscribe(senha => this.senhaGeralAtual = senha);
    this.senhaExamesSubscription = this.bidingService.senhaExames$.subscribe(senha => this.senhaExamesAtual = senha);

    this.listaDeSenhasSubscription = this.bidingService.listaDeSenhas$.subscribe(lista => {
      this.listaDeSenhasExibida = lista;
      console.log('Lista de Senhas na Tab 2:', this.listaDeSenhasExibida);
    });
  }

  ngOnDestroy() {
    if (this.senhaPrioritariaSubscription) this.senhaPrioritariaSubscription.unsubscribe();
    if (this.senhaGeralSubscription) this.senhaGeralSubscription.unsubscribe();
    if (this.senhaExamesSubscription) this.senhaExamesSubscription.unsubscribe();
    if (this.listaDeSenhasSubscription) this.listaDeSenhasSubscription.unsubscribe();
  }
  aplicarFiltro(tipo: string) {
    this.filtroAtual = tipo;
  }
  
  get listaFiltrada() {
    if (this.filtroAtual === 'todos') {
      return this.listaDeSenhasExibida;
    } else {
      return this.listaDeSenhasExibida.filter(senha => senha.tipo === this.filtroAtual);
    }
  }
 
  navegarParaAtendente(senhaSelecionada: { numero: number | null; tipo: string }) {
    this.bidingService.setSenhaEmAtendimento(senhaSelecionada);
    this.navCtrl.navigateForward('/tabs/tab3');
  }
    
}