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

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router
  ) {
    this.currentPhase = this.appCommunicationService.getCurrentPhase()
    this.createTableVUCABANIPhase()
  }

  public createTableVUCABANIPhase(): void {
    this.currentPhase.time.forEach((time: any) => {
      this.timeTables.push({
        date: `${new Date(time.date).getTime() < new Date().setUTCHours(0,0,0,0) ? 'PAST' : new Date(time.date).getTime() > new Date().setUTCHours(0, 0, 0, 0) && new Date(time.date).getTime() < new Date().setUTCHours(23, 59, 59, 999) ? 'PRESENT' : 'FUTURE'}: ${time.date}`,
        stackholders: [...Array.from(time.items).map((item: any, itemIndex: number) => {
          const riskTableTd: any = []
          for (let i = 0; i < item.inputsRisks.length; i += 2) {
            riskTableTd.push([`Ризик '${item.inputsRisks[i].label.split('Ймовірність виникнення ')[1].split(' %')[0]}'`, item.inputsRisks[i].value, item.inputsRisks[i + 1].value / 10, (item.inputsRisks[i].value / 100) * (item.inputsRisks[i + 1].value / 10) ])
          }
          return {
            label: item.label,
            riskTableParams: {
              th: ['Ризик', 'Ймовірність виникнення ризику (0 - 100)%',	'Вплив',	'Оцінка ризику'],
              td: [...riskTableTd]
            },
            waitingTableParams: {
              th: ['Ціль', 'Ймовірність досягнення цілі % (0 - 100)'],
              td: [...item.inputsWaiting.map((item: any) => [`Ціль '${item.label.split('Ймовірність виникнення ')[1].split(' %')[0]}'`, (item.value * +time.items[itemIndex].analyzeVUCABANI.indexProactivity).toFixed(2)])]
            }
          }
        })],
        tableParams: {
          th: ['Етап життєвого циклу', 'Індекс VUCA', 'Індекс BANI', 'Індекс переходу', 'Індекс проактивности'],
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
    tableParamsTd = tableParamsTd.map((td: number[]) => {
      return td.map((el: number | string, index: number) => {
        if (index > 0) {
          el = (+el / tableParamsTd.length).toFixed(4)
        }
        return el
      })
    })
    this.timeTables.unshift({
      date: 'Загальне значення етапу',
      stackholders: [],
      tableParams: {
        th: ['Етап життєвого циклу', 'Tvuca', 'Tbani', 'Індекс переходу', 'Індекс проактивности'],
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
