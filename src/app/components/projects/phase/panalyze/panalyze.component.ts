import { Component, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { Divider } from 'primeng/divider';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-panalyze',
  imports: [
    TableModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    ChartModule,
    Divider
  ],
  templateUrl: './panalyze.component.html',
  styleUrl: './panalyze.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanalyzeComponent {
  public current: any = {}
  public currentProject: any = {}
  public allTimeTables: any = []
  public chartsData: any = []

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.current = this.appCommunicationService.getCurrentProject()
    // this.createAllPhaseInfoInOne()
    // this.createAllPhaseInfo()
    this.createTableVUCABANIPhase()
  }

  public createTableVUCABANIPhase(): void {
    // const tableVUCABANITd = []
    this.current.phases.forEach((phase: any) => {
      const phaseTable: any = []
      phase.time.forEach((time: any) => {
        phaseTable.push({ tableParams: {
          th: ['Етап життєвого циклу', 'Tvuca', 'Tbani', 'Індекс протиставлення', 'Індекс проактивности'],
          td: [...Array.from(time.items).map((item: any) => [item.label, item.analyzeVUCABANI.Tbani, item.analyzeVUCABANI.Tvuca, item.analyzeVUCABANI.indexAg, item.analyzeVUCABANI.indexProactivity])]
        }})
      });
      let tableParamsTd: any = []
      phaseTable.forEach((table: any) => {
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
      this.allTimeTables.push({
        label: phase.name,
        tableParams: {
          th: ['Етап життєвого циклу', 'Індекс VUCA', 'Індекс BANI', 'Індекс переходу', 'Індекс проактивности'],
          td: tableParamsTd
        }
      })
    })
    this.initChart()
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public back(): void {
    this.appCommunicationService.saveCurrentPhase('')
    this.navigate('phase-risks')
  }
    //   data: any;
    // options: any;
    // platformId = inject(PLATFORM_ID);
    // configService = inject(AppConfigService);
    // designerService = inject(DesignerService);

  public initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    console.log(Array.from(this.allTimeTables).map((item: any) => item.label))
    this.current.stackholders.forEach((item: any, index: any) => {
      console.log(Array.from(this.allTimeTables).map((item: any) => +item.tableParams.td[index][1]))
      this.chartsData.push({
        label: `${item.type} - ${item.name}`,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 0.9,
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder
              }
            },
            y: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder
              }
            }
          }
        },
        data: {
          labels: Array.from(this.allTimeTables).map((item: any) => item.label),
          datasets: [
            {
              type: 'line',
              label: 'Середнє виведення індексів',
              borderColor: documentStyle.getPropertyValue('--p-amber-500'),
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              data: [...Array.from(this.allTimeTables).map((item: any) => ((+item.tableParams.td[index][1] + +item.tableParams.td[index][2] + +item.tableParams.td[index][3] + +item.tableParams.td[index][4]) ** (1 / 4)))]
            },
            {
              type: 'bar',
              label: 'Індекс VUCA',
              backgroundColor: documentStyle.getPropertyValue('--p-fuchsia-800'),
              data: [...Array.from(this.allTimeTables).map((item: any) => +item.tableParams.td[index][1])],
              borderColor: 'white',
              borderWidth: 2,
            },
            {
              type: 'bar',
              label: 'Індекс BANI',
              backgroundColor: documentStyle.getPropertyValue('--p-rose-700'),
              data: [...Array.from(this.allTimeTables).map((item: any) => +item.tableParams.td[index][2])],
              borderColor: 'white',
              borderWidth: 2
            },
            {
              type: 'bar',
              label: 'Індекс переходу',
              backgroundColor: documentStyle.getPropertyValue('--p-teal-700'),
              data: [...Array.from(this.allTimeTables).map((item: any) => +item.tableParams.td[index][3])],
            },
            {
              type: 'bar',
              label: 'Індекс проактивности',
              backgroundColor: documentStyle.getPropertyValue('--p-blue-800'),
              data: [...Array.from(this.allTimeTables).map((item: any) => +item.tableParams.td[index][4])],
              borderColor: 'white',
              borderWidth: 2
            }
          ]
        }
      })
    })
    // Array.from(this.current.stackholders).forEach()
    // chartsData
    // this.data = {
    //   labels: Array.from(this.allTimeTables).map((item: any) => item.label),
      // datasets: [
      //   {
      //     type: 'line',
      //     label: 'Dataset 1',
      //     borderColor: documentStyle.getPropertyValue('--p-orange-500'),
      //     borderWidth: 2,
      //     fill: false,
      //     tension: 0.4,
      //     data: [50, 25, 12, 48, 56, 76, 42]
      //   },
      //   {
      //     type: 'bar',
      //     label: 'Dataset 2',
      //     backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
      //     data: [21, 84, 24, 75, 37, 65, 34],
      //     borderColor: 'white',
      //     borderWidth: 2
      //   },
      //   {
      //     type: 'bar',
      //     label: 'Dataset 3',
      //     backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
      //     data: [41, 52, 24, 74, 23, 21, 32]
      //   }
    //   ]
    // };

    // this.options = {
    //   maintainAspectRatio: false,
    //   aspectRatio: 0.6,
    //   plugins: {
    //     legend: {
    //       labels: {
    //         color: textColor
    //       }
    //     }
    //   },
    //   scales: {
    //     x: {
    //       ticks: {
    //         color: textColorSecondary
    //       },
    //       grid: {
    //         color: surfaceBorder
    //       }
    //     },
    //     y: {
    //       ticks: {
    //         color: textColorSecondary
    //       },
    //       grid: {
    //         color: surfaceBorder
    //       }
    //     }
    //   }
    // };
    this.cd.markForCheck();
  }
}
