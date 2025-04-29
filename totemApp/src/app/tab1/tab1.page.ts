import { Component } from '@angular/core';
import { BidingService } from "../services/biding.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  isAlertOpen = false;
  senhaPrioritaria = 0;
  senhaGeral = 0;
  retiradaExames = 0;
  alertButtons = [
    {
      text: 'Verificar',
      handler: () => {
        this.navCtrl.navigateForward('/tabs/tab4');
      }
    }
  ];

  isAlertPrioritariaOpen = false;
  isAlertGeralOpen = false;
  isAlertExamesOpen = false;

  constructor(
    private bidingService: BidingService,
    private navCtrl: NavController
  ) {
    this.bidingService.varivavelTeste = "Shalala";
  }

  abrirAlertaPrioritaria() {
    this.senhaPrioritaria++;
    this.bidingService.setSenhaPrioritaria(this.senhaPrioritaria);
    this.bidingService.adicionarNovaSenha({ numero: this.senhaPrioritaria, tipo: 'SP' }); // Adiciona à lista
    this.isAlertPrioritariaOpen = true; // Manter ou remover conforme necessidade
  }

  abrirAlertaGeral() {
    this.senhaGeral++;
    this.bidingService.setSenhaGeral(this.senhaGeral);
    this.bidingService.adicionarNovaSenha({ numero: this.senhaGeral, tipo: 'SG' }); // Adiciona à lista
    this.isAlertGeralOpen = true; // Manter ou remover conforme necessidade
  }

  abrirAlertaExames() {
    this.retiradaExames++;
    this.bidingService.setSenhaExames(this.retiradaExames);
    this.bidingService.adicionarNovaSenha({ numero: this.retiradaExames, tipo: 'SE' }); // Adiciona à lista
    this.isAlertExamesOpen = true; // Manter ou remover conforme necessidade
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}