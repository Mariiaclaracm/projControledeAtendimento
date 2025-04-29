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

  constructor(
    private bidingService: BidingService
  ) {
    this.bidingService.varivavelTeste = "Shalala";
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}