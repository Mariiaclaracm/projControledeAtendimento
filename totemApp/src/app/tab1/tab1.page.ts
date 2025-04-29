import { Component } from '@angular/core';
import { BidingService } from "../services/biding.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  isAlertOpen = false;
  alertButtons = ['Action'];
 
  isAlertPrioritariaOpen = false;
  isAlertGeralOpen = false;
  isAlertExamesOpen = false;
  
    // alertButtons: AlertButton[] = ['OK'];

  constructor(
    private bidingService: BidingService
  ) {
    this.bidingService.varivavelTeste = "Shalala";
  }

  abrirAlertaPrioritaria() {
    this.isAlertPrioritariaOpen = true;
  }

  abrirAlertaGeral() {
    this.isAlertGeralOpen = true;
  }

  abrirAlertaExames() {
    this.isAlertExamesOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}