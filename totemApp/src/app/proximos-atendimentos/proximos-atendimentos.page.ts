import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-proximos-atendimentos',
  templateUrl: './proximos-atendimentos.page.html',
  styleUrls: ['./proximos-atendimentos.page.scss'],
  standalone: true, 
  imports: [IonicModule]
})
export class ProximosAtendimentosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
