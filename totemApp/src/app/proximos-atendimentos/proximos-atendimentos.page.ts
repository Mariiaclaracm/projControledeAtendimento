// proximos-atendimentos.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BidingService } from '../services/biding.service';
import { Subscription } from 'rxjs';

interface AtendimentoEncerradoExibicao {
  atual: string | null;
  proximos: { numero: number | null; tipo: string }[];
  guiche: string | undefined;
  tipo?: string | undefined;
}

@Component({
  selector: 'app-proximos-atendimentos',
  templateUrl: './proximos-atendimentos.page.html',
  styleUrls: ['./proximos-atendimentos.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProximosAtendimentosPage implements OnInit, OnDestroy {
  historicoPrioritarias: AtendimentoEncerradoExibicao = { atual: null, proximos: [], guiche: undefined };
  historicoGerais: AtendimentoEncerradoExibicao = { atual: null, proximos: [], guiche: undefined };
  historicoExames: AtendimentoEncerradoExibicao = { atual: null, proximos: [], guiche: undefined };
  historicoAtual: AtendimentoEncerradoExibicao = { atual: null, proximos: [], guiche: undefined};

  private historicoSubscription: Subscription | undefined;
  private listaDeSenhasSubscription: Subscription | undefined;
  private senhaPrioritariaSubscription: Subscription | undefined;
  private senhaGeralSubscription: Subscription | undefined;
  private senhaExamesSubscription: Subscription | undefined;
  private guicheEmAtendimentoSubscription: Subscription | undefined; // Nova subscription
  guicheAtualChamado: string | null = null; // Nova variável

  ultimoPrioritarioGerado: number | null = null;
  ultimoGeralGerado: number | null = null;
  ultimoExameGerado: number | null = null;

  constructor(private bidingService: BidingService, private router: Router) { }

  traduzirTipoSenha(tipo: string | undefined): string {
    switch (tipo) {
      case 'SP':
        return 'Prioritária';
      case 'SG':
        return 'Geral';
      case 'SE':
        return 'Exame';
      default:
        return tipo || ''; 
    }
  }  
  ngOnInit() {
    this.carregarHistoricoInicial();
    this.escutarNovosAtendimentos();
    this.escutarListaDeSenhas();
    this.escutarSenhasGeradas();
    this.escutarGuicheEmAtendimento(); // Escuta as mudanças no guichê
  }

  ngOnDestroy() {
    if (this.historicoSubscription) {
      this.historicoSubscription.unsubscribe();
    }
    if (this.listaDeSenhasSubscription) {
      this.listaDeSenhasSubscription.unsubscribe();
    }
    if (this.senhaPrioritariaSubscription) {
      this.senhaPrioritariaSubscription.unsubscribe();
    }
    if (this.senhaGeralSubscription) {
      this.senhaGeralSubscription.unsubscribe();
    }
    if (this.senhaExamesSubscription) {
      this.senhaExamesSubscription.unsubscribe();
    }
    if (this.guicheEmAtendimentoSubscription) {
      this.guicheEmAtendimentoSubscription.unsubscribe();
    }
  }

  escutarGuicheEmAtendimento() {
    this.guicheEmAtendimentoSubscription = this.bidingService.guicheEmAtendimento$.subscribe(guiche => {
      this.guicheAtualChamado = guiche;
      console.log('Guichê recebido na Tab 4:', this.guicheAtualChamado); // <--- ADICIONE ESTE LOG
    });
  }  

  escutarSenhasGeradas() {
    this.senhaPrioritariaSubscription = this.bidingService.senhaPrioritaria$.subscribe(senha => {
      this.ultimoPrioritarioGerado = senha;
      this.atualizarProximos();
    });
    this.senhaGeralSubscription = this.bidingService.senhaGeral$.subscribe(senha => {
      this.ultimoGeralGerado = senha;
      this.atualizarProximos();
    });
    this.senhaExamesSubscription = this.bidingService.senhaExames$.subscribe(senha => {
      this.ultimoExameGerado = senha;
      this.atualizarProximos();
    });
  }

  carregarHistoricoInicial() {
    this.historicoSubscription = this.bidingService.historicoAtendimentosEncerrados$.subscribe(historico => {
      this.atualizarHistoricoExibicao(historico);
    });
    this.atualizarProximos();
  }

  escutarNovosAtendimentos() {
    this.historicoSubscription = this.bidingService.historicoAtendimentosEncerrados$.subscribe(historico => {
      this.atualizarHistoricoExibicao(historico);
      this.atualizarProximos();
    });
  }

  escutarListaDeSenhas() {
    this.listaDeSenhasSubscription = this.bidingService.listaDeSenhas$.subscribe(() => {
      this.atualizarProximos();
    });
  }

  atualizarHistoricoExibicao(historico: { senha: number | null; tipo: string | undefined; guiche: string }[]) {
    const prioritarias = historico.filter(atendimento => atendimento.tipo?.startsWith('SP'));
    if (prioritarias.length > 0) {
      this.historicoPrioritarias.atual = prioritarias[prioritarias.length - 1]?.senha?.toString() || null;
      this.historicoPrioritarias.guiche = prioritarias[prioritarias.length - 1]?.guiche;
    } else {
      this.historicoPrioritarias.atual = null;
      this.historicoPrioritarias.guiche = undefined;
    }
  
    const gerais = historico.filter(atendimento => atendimento.tipo?.startsWith('SG'));
    if (gerais.length > 0) {
      this.historicoGerais.atual = gerais[gerais.length - 1]?.senha?.toString() || null;
      this.historicoGerais.guiche = gerais[gerais.length - 1]?.guiche;
    } else {
      this.historicoGerais.atual = null;
      this.historicoGerais.guiche = undefined;
    }
  
    const exames = historico.filter(atendimento => atendimento.tipo?.startsWith('SE'));
    if (exames.length > 0) {
      this.historicoExames.atual = exames[exames.length - 1]?.senha?.toString() || null;
      this.historicoExames.guiche = exames[exames.length - 1]?.guiche;
    } else {
      this.historicoExames.atual = null;
      this.historicoExames.guiche = undefined;
    }
  
  
    if (historico.length > 0) {
      this.historicoAtual.atual = historico[historico.length - 1]?.senha?.toString() || null;
      this.historicoAtual.guiche = historico[historico.length - 1]?.guiche;
      this.historicoAtual.tipo = this.traduzirTipoSenha(historico[historico.length - 1]?.tipo); // Use a função de tradução
    } else {
      this.historicoAtual.atual = null;
      this.historicoAtual.guiche = undefined;
      this.historicoAtual.tipo = undefined;
    }
  }

  atualizarProximos() {
    this.historicoPrioritarias.proximos = this.bidingService.getProximasSenhas('SP');
    this.historicoGerais.proximos = this.bidingService.getProximasSenhas('SG');
    this.historicoExames.proximos = this.bidingService.getProximasSenhas('SE');
  }

  
}