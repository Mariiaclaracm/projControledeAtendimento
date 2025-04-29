import { Component } from '@angular/core';
import { BidingService } from "../services/biding.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
    private navCtrl: NavController // Injeta o NavController
  ) {
    this.bidingService.varivavelTeste = "Shalala";
  }

  abrirAlertaPrioritaria() {
    this.senhaPrioritaria++;
    this.isAlertPrioritariaOpen = true;
  }

  abrirAlertaGeral() {
    this.senhaGeral++;
    this.isAlertGeralOpen = true;
  }

  abrirAlertaExames() {
    this.retiradaExames++;
    this.isAlertExamesOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
