import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { Divider } from "primeng/divider";
@Component({
  selector: 'app-pinfo',
  imports: [
    TableModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    Divider
],
  templateUrl: './pinfo.component.html',
  styleUrl: './pinfo.component.scss',
})
export class PinfoComponent {
  public currentPhase: any = {}
  public timeTables: any = []
  // {
  //   th: ['/', 'Tvuca', 'Tbani', 'Індекс протиставлення', 'Індекс проактивности'],
  //   td: []
  // }

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router
  ) {
    this.currentPhase = this.appCommunicationService.getCurrentPhase()
    this.createAllPhaseInfoInOne()
    this.createAllPhaseInfo()
    this.createTableVUCABANIPhase()
  }
  public createAllPhaseInfoInOne(): void {

  }

  public createAllPhaseInfo(): void {

  }

  public createTableVUCABANIPhase(): void {
    // const tableVUCABANITd = []

    this.currentPhase.time.forEach((time: any) => {
      this.timeTables.push({
        date: time.date,
        stackholders: [...Array.from(time.items).map((item: any) => {
          const riskTableTd: any = []
          for (let i = 0; i < item.inputsRisks.length; i += 2) {
            riskTableTd.push([item.inputsRisks[i].label.split('Ймовірність виникнення')[1].split(' %')[0], item.inputsRisks[i].value / 100, item.inputsRisks[i + 1].value / 10, (item.inputsRisks[i].value / 100) * (item.inputsRisks[i + 1].value / 10) ])
          }
          return {
            label: item.label,
            riskTableParams: {
              th: ['/', 'Рij(Tі)',	'Vij(Tі)',	'Rij'],
              td: [...riskTableTd]
            },
            waitingTableParams: {
              th: ['/', 'Рij(Tі)'],
              td: [...item.inputsWaiting.map((item: any) => [item.label, item.value])]
            }
          }
        })],
        tableParams: {
          th: ['/', 'Tvuca', 'Tbani', 'Індекс протиставлення', 'Індекс проактивности'],
          td: [...Array.from(time.items).map((item: any) => [item.label, item.analyzeVUCABANI.Tbani, item.analyzeVUCABANI.Tvuca, item.analyzeVUCABANI.indexAg, item.analyzeVUCABANI.indexProactivity])]
        }
      })
    });
    let tableParamsTd: any = []
    this.timeTables.forEach((table: any) => {
      if (!tableParamsTd.length) {
        table.tableParams.td.forEach((td: any, index: number) => {
          tableParamsTd.push([...td])
        })
      } else {
        table.tableParams.td.forEach((td: any, index: number) => {
          tableParamsTd[index][1] = (+tableParamsTd[index][1] + +td[1]).toFixed(4)
          tableParamsTd[index][2] = (+tableParamsTd[index][2] + +td[2]).toFixed(4)
          tableParamsTd[index][3] = (+tableParamsTd[index][3] + +td[3]).toFixed(4)
          tableParamsTd[index][4] = (+tableParamsTd[index][4] + +td[4]).toFixed(4)
        });
      }
    });
    console.log(this.timeTables, tableParamsTd)
    this.timeTables.unshift({
      date: 'Загальне значення етапу',
      stackholders: [],
      tableParams: {
        th: ['/', 'Tvuca', 'Tbani', 'Індекс протиставлення', 'Індекс проактивности'],
        td: tableParamsTd
      }
    })
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public back(): void {
    this.appCommunicationService.saveCurrentPhase('')
    this.navigate('phase-risks')
  }
}
