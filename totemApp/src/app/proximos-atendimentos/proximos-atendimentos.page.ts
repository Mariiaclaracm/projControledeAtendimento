import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BidingService } from '../services/biding.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-proximos-atendimentos',
  templateUrl: './proximos-atendimentos.page.html',
  styleUrls: ['./proximos-atendimentos.page.scss'],
  standalone: true, 
  imports: [IonicModule]
})
export class ProximosAtendimentosPage implements OnInit {
  senhaAtendida: any;
  guicheAtendimento: string = '';
  private listaDeSenhasSubscription: Subscription | undefined;
  proximosPrioritarios: { numero: number | null; tipo: string; guiche: string }[] = [];
  proximosGerais: { numero: number | null; tipo: string; guiche: string }[] = [];
  proximosExames: { numero: number | null; tipo: string; guiche: string }[] = [];

  constructor(private route: ActivatedRoute, private bidingService: BidingService) { }

  ngOnInit() {
    if (history.state && history.state['senhaAtendida'] && history.state['guicheAtendimento']) {
      this.senhaAtendida = history.state['senhaAtendida'];
      this.guicheAtendimento = history.state['guicheAtendimento'];
      console.log('Senha Atendida no Tab 4 (OnInit):', this.senhaAtendida);
      console.log('Guichê de Atendimento no Tab 4 (OnInit):', this.guicheAtendimento);
    } else {
      console.log('Nenhuma informação de atendimento recebida no Tab 4 (OnInit).');
    }
  }
  

    ionViewDidEnter() {
      this.listaDeSenhasSubscription = this.bidingService.listaDeSenhas$.pipe(
        map(senhas => senhas.filter(senha => senha.status !== 'atendido' && senha.status !== 'cancelada'))
      ).subscribe(senhasFiltradas => {
        this.proximosPrioritarios = senhasFiltradas
          .filter(senha => senha.tipo === 'SP')
          .slice(0, 3)
          .map(senha => ({ ...senha, guiche: this.bidingService.getGuicheAtual(senha.tipo) }));
        this.proximosGerais = senhasFiltradas
          .filter(senha => senha.tipo === 'SG')
          .slice(0, 3)
          .map(senha => ({ ...senha, guiche: this.bidingService.getGuicheAtual(senha.tipo) }));
        this.proximosExames = senhasFiltradas
          .filter(senha => senha.tipo === 'SE')
          .slice(0, 3)
          .map(senha => ({ ...senha, guiche: this.bidingService.getGuicheAtual(senha.tipo) }));
  
        console.log('Próximos Prioritários (ionViewDidEnter):', this.proximosPrioritarios);
        console.log('Próximos Gerais (ionViewDidEnter):', this.proximosGerais);
        console.log('Próximos Exames (ionViewDidEnter):', this.proximosExames);
      });
    }
  
    ionViewWillLeave() {
      if (this.listaDeSenhasSubscription) {
        this.listaDeSenhasSubscription.unsubscribe();
      }
    }
  
    ngOnDestroy() {
      if (this.listaDeSenhasSubscription) {
        this.listaDeSenhasSubscription.unsubscribe();
      }
    }
  }
