import { Component } from '@angular/core';
import { BidingService } from "../services/biding.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(
    private bidingService: BidingService
  ) {
    console.log(this.bidingService.varivavelTeste);
  }

}
