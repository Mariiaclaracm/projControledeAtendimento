import { Component, OnInit, OnDestroy } from '@angular/core';
import { BidingService } from '../services/biding.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit, OnDestroy{
  senhaRecebida: any;
  private senhaEmAtendimentoSubscription: Subscription | undefined;
  guicheAtual: string = ''; 
  novoGuiche: number | null = null;

  constructor(private bidingService: BidingService,private navCtrl: NavController) {}
  
  ngOnInit() {
    this.senhaEmAtendimentoSubscription = this.bidingService.senhaEmAtendimento$.subscribe(senha => {
      this.senhaRecebida = senha;
      if (senha && senha.tipo) {
        this.guicheAtual = this.bidingService.getGuicheAtual(senha.tipo);
      } else {
        this.guicheAtual = '';
      }
      console.log('Senha em Atendimento:', this.senhaRecebida);
    });
  }

  ngOnDestroy() {
    if (this.senhaEmAtendimentoSubscription) {
      this.senhaEmAtendimentoSubscription.unsubscribe();
    }
  }

  encerrarAtendimento() {
    if (this.novoGuiche !== null) {
      this.guicheAtual = String(this.novoGuiche).padStart(2, '0');
      if (this.senhaRecebida && this.senhaRecebida.tipo) {
        this.bidingService.setGuicheAtual(this.senhaRecebida.tipo, this.guicheAtual);
      } else {
        this.bidingService.setGuicheAtual('default', this.guicheAtual);
      }
      this.novoGuiche = null;
      console.log('Atendimento encerrado para a senha:', this.senhaRecebida, 'no guichê:', this.guicheAtual);
      this.navCtrl.navigateForward('/tabs/tab4', {
        state: {
          senhaAtendida: this.senhaRecebida,
          guicheAtendimento: this.guicheAtual
        }
      });
      this.bidingService.marcarSenhaComoAtendida(this.senhaRecebida);
      this.bidingService.setSenhaEmAtendimento(null); // Limpa a senha em atendimento no serviço
      this.senhaRecebida = null; // Limpa a senha recebida no componente
    } else {
      console.log('Nenhum guichê digitado para encerrar o atendimento.');
    }
  }

  cancelarAtendimento() {
    if (this.senhaRecebida) {
      const senhaCancelada = { ...this.senhaRecebida, status: 'cancelada' };
      this.bidingService.atualizarSenhaNaLista(senhaCancelada);
      this.bidingService.setSenhaEmAtendimento(null); 
      console.log('Atendimento cancelado para a senha:', this.senhaRecebida);
    } else {
      console.log('Nenhuma senha selecionada para cancelar.');
    }
  }
}

