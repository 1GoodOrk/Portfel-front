import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';

@Component({
  selector: 'app-analyze',
  imports: [
    AccordionModule,
    ButtonModule,
    DialogModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    ChartModule,
    InfoDialogComponent,
    DividerModule,
    TableModule,
    ButtonModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.scss',
})
export class AnalyzeComponent {
  public current: any = {
    all: 0,
    check: 0,
    critical: 0
  }
  public stairs: any = {
    all: 0,
    check: 0,
    critical: 0
  }
  public butterfly: any = {
    all: 0,
    check: 0,
    critical: 0
  }
  public basicData: any = {}
  public basicStairsData: any = {}
  public basicButterflyData: any = {}
  public basicOptions: any = {}
  public currentProject: any = {}
  public risksData: any = []

  public inputs: any = {}

  public visible: any = {
    info: false
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (this.currentProject.analyze) {
      this.recreateCharts()
    }
  }

  public showInfoProjectDialog(event?: any): void {
    event.stopPropagation()
    this.visible.info = true
    this.appCommunicationService.sendInfoData({ inputRowsName: 'logistic', header: `Переглянути проект "${this.currentProject.name}"` })
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public openDialogInfo(index: number): void {
    this.appCommunicationService.saveCurrentRisk(this.currentProject.risks[index])
    this.navigate(`risk/${this.currentProject.risks[index]._id}`)
  }

  public recreateCharts () {
    this.currentProject.analyze.butterfly.forEach((el: any) => {
      this.current.all++
      this.butterfly.all++
      if (el.status === 'Критична' || el.status === 'Висока') {
        this.current.critical++
        this.butterfly.critical++
      } else {
        this.current.check++
        this.butterfly.check++
      }
    });
    this.currentProject.analyze.stairs.forEach((el: any) => {
      this.current.all++
      this.stairs.all++
      if (el.value >= 50) {
        this.current.critical++
        this.stairs.critical++
      } else {
        this.current.check++
        this.stairs.check++
      }
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Усі', 'Моніторинг', 'Вимагають прийняття рішення', 'Усі (модель "Метелик")', 'Моніторинг (модель "Метелик")', 'Вимагають прийняття рішення (модель "Метелик")', 'Усі (модель "Сходи")', 'Моніторинг (модель "Сходи")', 'Вимагають прийняття рішення (модель "Сходи")'],
      datasets: [
        {
          label: 'Ризики',
          data: [this.current.all, this.current.check, this.current.critical, this.butterfly.all, this.butterfly.check, this.butterfly.critical, this.stairs.all, this.stairs.check, this.stairs.critical],
          backgroundColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred', 'rgb(55, 7, 152)', 'darkblue', 'darkred','rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred', 'rgb(55, 7, 152)', 'darkblue', 'darkred','rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderWidth: 1
        }
      ]
    };
    this.basicStairsData = {
      labels: ['Усі', 'Моніторинг', 'Вимагають прийняття рішення'],
      datasets: [
        {
          label: 'Ризики',
          data: [this.stairs.all, this.stairs.check, this.stairs.critical],
          backgroundColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderWidth: 1
        }
      ]
    };
    this.basicButterflyData = {
      labels: ['Усі', 'Моніторинг', 'Вимагають прийняття рішення'],
      datasets: [
        {
          label: 'Ризики',
          data: [this.butterfly.all, this.butterfly.check, this.butterfly.critical],
          backgroundColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderColor: ['rgb(55, 7, 152)', 'darkblue', 'darkred'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
