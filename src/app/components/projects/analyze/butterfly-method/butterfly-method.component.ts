import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Times, Pencil, Eye } from '@primeicons/angular';
import { FormsModule, NgForm } from '@angular/forms';
import * as d3 from 'd3';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
import { FactorsComponent } from './factors/factors.component';
import {
  IChartsBarDataContainer,
  IChartsBarOptionsContainer,
  IDialogVisibility,
  EDialogVisibilityKeys,
  ITableContainer,
  EButterflyFilterModes,
  IProjectData,
  IRiskButterflyData,
  ERiskButterflyStatus,
  ESolutionFinalStatus,
  ISolutionData,
  EInputRowsName
} from '@port/interfaces';

@Component({
  selector: 'app-butterfly-method',
  imports: [
    FormsModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    ChartModule,
    HeaderComponent,
    FooterComponent,
    FactorsComponent,
    InfoDialogComponent,
    CreationDialogComponent,
    Times, Pencil, Eye
  ],
  templateUrl: './butterfly-method.component.html',
  styleUrl: './butterfly-method.component.scss',
})
export class ButterflyMethodComponent {
  public currentMode: EButterflyFilterModes = EButterflyFilterModes.all
  public basicData!: IChartsBarDataContainer
  public basicOptions!: IChartsBarOptionsContainer
  public currentRiskTables: ITableContainer<string> = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Тип діяльності', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
    td: []
  }
  public currentProject!: IProjectData
  public butterflyFactorData!: { tableParams: ITableContainer<string>; };

  public visible: IDialogVisibility = {
    info: false,
    creation: false
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private fakeRequestService: FakeRequestService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (!this.currentProject.analyze.butterfly) {
      this.currentProject.analyze.butterfly = []
    }
    this.currentProject.analyze.butterfly = this.currentProject.analyze.butterfly.map((el: IRiskButterflyData) => {
      el = this.indexCalculation(el)
      return el
    })
    this.recreateTable()
    if (this.currentProject.analyze.butterflyFactorData) {
      this.createCharts()
    }
    this.recreateCharts()
  }

  public get eButterflyFilterModes(): typeof EButterflyFilterModes {
    return EButterflyFilterModes
  }

  public get eRiskButterflyStatus(): typeof ERiskButterflyStatus {
    return ERiskButterflyStatus
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public back():void {
    this.navigate('analyze')
  }

  public visibleOnChange(key: EDialogVisibilityKeys): void {
    this.visible[key] = !this.visible[key]
  }

  private fakeRequest(id: string, data: IProjectData): void {
    this.fakeRequestService.updateProject(id, data)
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
  }

  public updateProject(): void {
    this.fakeRequest(this.currentProject._id, this.currentProject)
    // this.httpService
    //   .updateProject(this.currentProject._id, this.currentProject)
    //   .subscribe(() => {
    //     this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    //   })
  }

  private indexCalculation(data: IRiskButterflyData): IRiskButterflyData {
    data.value = +(data.probability * data.influence / 100).toFixed(2)
    data.firstValue = data.value
    if (!data.dateCreation) {
      data.dateCreation = new Date().toISOString().split('T').join(' - ').split('Z')[0]
    }
    data.status = data.value > 75 ?
      ERiskButterflyStatus.critical :
      data.value > 50 ? ERiskButterflyStatus.high :
      data.value > 25 ? ERiskButterflyStatus.middle : ERiskButterflyStatus.low
    if (data.solutions && data.solutions.length) {
      data = this.riskValueRecalculation(data)
    }
    return data
  }

  private riskValueRecalculation(data: IRiskButterflyData): IRiskButterflyData{
    data.value = data.firstValue
    data.solutions.forEach((dataSolution: ISolutionData) => {
      if (dataSolution.finalState === ESolutionFinalStatus.success) {
        data.value = data.value > dataSolution.value ? +(data.value - dataSolution.value).toFixed(2) : 0
        if (data.value === 0) {
          data.status = ERiskButterflyStatus.low
        } else {
          data.status = data.value > 75 ? ERiskButterflyStatus.critical : data.value > 50 ? ERiskButterflyStatus.high : data.value > 25 ? ERiskButterflyStatus.middle : ERiskButterflyStatus.low
        }
      } else if (dataSolution.finalState === ESolutionFinalStatus.unsuccess) {
        data.value = +(data.value + dataSolution.value).toFixed(2)
        data.status = data.value > 75 ? ERiskButterflyStatus.critical : data.value > 50 ? ERiskButterflyStatus.high : data.value > 25 ? ERiskButterflyStatus.middle : ERiskButterflyStatus.low
      }
    })
    return data
  }
  public updateRisk(data: IRiskButterflyData): void {
    data = this.indexCalculation(data)
    this.visible.creation = false
    this.recreateTable()
    this.recreateCharts()
    this.updateProject()
  }

  public createRisk(data: IRiskButterflyData): void {
    data = this.indexCalculation(data)
    if (!this.currentProject.analyze.butterfly) {
      this.currentProject.analyze.butterfly = []
    }
    this.currentProject.analyze.butterfly.push(data)
    this.visible.creation = false
    this.recreateTable()
    this.recreateCharts()
    this.updateProject()
  }

  public recreateTable(): void {
    this.currentProject.analyze.butterflyRisksTableParams = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Тип діяльності', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.butterfly.forEach((risk: IRiskButterflyData) => {
      this.currentProject.analyze.butterflyRisksTableParams.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.moveState, risk.status, `${risk.value} %`])
    })
    this.tableFilter()
  }

  private refreshTable(): void {
    this.currentRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Тип діяльності', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.butterfly.forEach((risk: IRiskButterflyData) => {
      this.currentRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.moveState, risk.status, `${risk.value} %`])
    })
  }

  public tableFilter(mode?: EButterflyFilterModes): void {
    if (mode) {
      this.currentMode = mode
    }
    this.refreshTable()
    if (this.currentMode !== EButterflyFilterModes.all) {
      this.currentRiskTables.td = this.currentRiskTables.td.filter((row: Array<string>) => row[4] === this.currentMode)
    }
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.butterfly[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: EInputRowsName.butterfly, header: 'Інформація про ризик' })
  }

  public openDialogAddUpdateRow(index?: number): void {
    this.visible.creation = true
    if (!index && index !== 0) {
      this.appCommunicationService.clearCurrentRisk()
    } else {
      this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.butterfly[index])
    }
    this.appCommunicationService.sendCreateData({ inputRowsName: EInputRowsName.butterfly, header: !index && index !== 0 ? 'Створити ризик' : 'Оновити ризик' })
  }

  public remove(index: number): void {
    this.currentProject.analyze.butterfly.splice(index, 1)
    this.updateProject()
    this.recreateTable()
  }

  public updateView(): void {
    this.createCharts()
  }

  public recreateCharts():void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const calculation = {
      proj: 0,
      oper: 0,
      double: 0
    }
    this.currentRiskTables.td.forEach((row: Array<string>) => {
      row[4] === EButterflyFilterModes.project ? calculation.proj++ :
        row[4] === EButterflyFilterModes.operational ? calculation.oper++ : calculation.double++
    });
    this.basicData = {
      labels: ['Проектні', 'Операційні', 'Дублюючі'],
      datasets: [
        {
          label: 'Ризики',
          data: [calculation.proj, calculation.oper, calculation.double],
          backgroundColor: ['darkgreen', 'darkblue', 'darkred'],
          borderColor: ['darkgreen', 'darkblue', 'darkred'],
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

  async createCharts() {
    const links: any = []
    this.currentProject.analyze.butterflyFactorData.tableParams.td.forEach((td: Array<number>) => {
      td.forEach((elTd: number, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0 && tdIndex !== 0) {
          links.push({
            source: td[0],
            target: this.currentProject.analyze.butterflyFactorData.tableParams.th[tdIndex],
            type: elTd
          })
        }
      })
    })

    const data = {
      nodes: Array.from(new Set(links.flatMap((l: any) => [l.source, l.target])), id => ({
        id
      })),
      links
    };

    const elemPrev: any = document.getElementById('model-container-KO');
    if (elemPrev) {
      elemPrev.remove();
    }

    const chart = this.mobilePatentSuits(data, {svgId: 'model-container-KO'});
    // const chartSwatches = this.swatches(chart.scales.color);
    if (links.length) {
      const timeout = setTimeout(() => {
        const elem: any = document.getElementById('model-container');
        if (elem) {
          elem.append(chart)
        }
        clearTimeout(timeout)
      }, 100)
    }
    // this.cdr.detectChanges()
    // d3.select('.model-container').append(() => chartSwatches);
  }

  linkArc(d: any) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
  }

  drag(simulation: any): any {
    const dragstarted = (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    const dragged = (event: any, d: any) => {
      d.fx = event.x;
      d.fy = event.y;
    }
    const dragended = (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }


  mobilePatentSuits(data: any, {
    svgId = 'mobile-patent-suits',
    width = 1000,
    height = 800,
    invalidation = new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: type error
        // @ts-expect-error
        resolve();
      }, 8000);
    })
  } = {}) {
    const links = data.links.map((d: any) => Object.create(d));
    const nodes = data.nodes.map((d: any) => Object.create(d));

    const types: any = Array.from(new Set(data.links.map((d: any) => d.type)));
    const color: any = d3.scaleOrdinal(types, d3.schemeCategory10);
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-7000))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    const svg = d3.create('svg')
      .attr('id', svgId)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .style('font', '20px sans-serif');

    const arrowPoints: any = [[0, 0], [0, 20], [20, 10]];
    // Per-type markers, as they don't inherit styles.
    svg.append('defs').selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', (d: any) => `url(#arrow)`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -0.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr("fill", color)
      .attr('d', 'M0,-5L10,0L0,5');

    const link = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 2.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('stroke', (d: any) => color(d.type))
      .attr('marker-end', (d: any) => `url(#arrow)`)

    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 2.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', d3.line()(arrowPoints))
      .attr("fill", 'black')


    const node = svg.append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(this.drag(simulation));
    node.append('arrow')

    node.append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('r', 6);

    node.append('text')
      .attr('x', 8)
      .attr('y', '0.31em')
      .text((d: any) => d.id)
      .clone(true).lower()
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3);

    simulation.on('tick', () => {
      link.attr('d', this.linkArc);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    invalidation.then(() => simulation.stop());
    const svgNode: any = svg.node()
    return Object.assign(svgNode, {
      scales: {
        color
      }
    });
  }

  swatches (color: any, {
    svgId = 'swatches',
    nColumns = 10,
    format = () => {},
    // TODO: type error
    // @ts-expect-error
    unknown: formatUnknown,
    // TODO: type error
    // @ts-expect-error
    swatchSize = 15,
    swatchWidth = swatchSize,
    swatchHeight = swatchSize,
    textWidth = 100,
    width = 800,
    height = 44,
    marginTop = 18,
    marginLeft = 0,
  } = {}): any {
    const unknown = formatUnknown == null ? undefined : color.unknown();
    const unknowns = unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
    const domain = color.domain().concat(unknowns);
    if (format === undefined) {
      // TODO: type error
      // @ts-expect-error
      format = (x: any) => x === unknown ? formatUnknown : x;
    }

    const svg = d3.create('svg')
      .attr('id', svgId)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('overflow', 'visible')
      .style('display', 'block');

    svg.append('g')
      .selectAll('rect')
      .data(color.domain())
      .join('rect')
      .attr('x', (d, i) => marginLeft + (i % nColumns) * (swatchWidth + textWidth))
      .attr('y', (d, i) => marginTop + Math.floor(i / nColumns) * (swatchHeight + 10))
      .attr('width', swatchWidth)
      .attr('height', swatchHeight)
      .attr('fill', color)
      .text((d: any) => d);

    svg.append('g')
      .selectAll('text')
      .data(color.domain())
      .join('text')
      .attr('x', (d, i) => marginLeft + swatchWidth + (i % nColumns) * (swatchWidth + textWidth))
      .attr('y', (d, i) => marginTop + swatchHeight / 2 + Math.floor(i / nColumns) * (swatchHeight + 10))
      .attr('dx', 3)
      .attr('dy', '.35em')
      .style('vertical-align', 'middle')
      // TODO: type error
      // @ts-expect-error
      .text(d => format(d));


    return svg.node();
  }

  legend = (color: any, {
    svgId = 'legend',
    // TODO: type error
    // @ts-expect-error
    title,
    // TODO: type error
    // @ts-expect-error
    tickSize = 6,
    // TODO: type error
    // @ts-expect-error
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    // TODO: type error
    // @ts-expect-error
    tickFormat,
    // TODO: type error
    // @ts-expect-error
    tickValues
  } = {}) => {
    const ramp = (color: any, n = 256) => {
      const canvas = document.createElement('canvas');
      canvas.width = n;
      canvas.height = 1;
      const context: any = canvas.getContext('2d');
      for (let i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 1, 1);
      }
      return canvas;
    }

    const svg = d3.create('svg')
      .attr('id', svgId)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('overflow', 'visible')
      .style('display', 'block');

    let tickAdjust = (g: any) => g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
    let x;

    // Continuous
    if (color.interpolate) {
      const n = Math.min(color.domain().length, color.range().length);

      x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

      svg.append('image')
        .attr('x', marginLeft)
        .attr('y', marginTop)
        .attr('width', width - marginLeft - marginRight)
        .attr('height', height - marginTop - marginBottom)
        .attr('preserveAspectRatio', 'none')
        .attr('xlink:href', ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
    }
    // Sequential
    else if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {
          range() {
            return [marginLeft, width - marginRight];
          }
        });

      svg.append('image')
        .attr('x', marginLeft)
        .attr('y', marginTop)
        .attr('width', width - marginLeft - marginRight)
        .attr('height', height - marginTop - marginBottom)
        .attr('preserveAspectRatio', 'none')
        .attr('xlink:href', ramp(color.interpolator()).toDataURL());

      // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== 'function') {
          tickFormat = d3.format(tickFormat === undefined ? ',f' : tickFormat);
        }
      }
    }
    // Threshold
    else if (color.invertExtent) {
      const thresholds = color.thresholds ? color.thresholds() // scaleQuantize
        :
        color.quantiles ? color.quantiles() // scaleQuantile
        :
        color.domain(); // scaleThreshold

      const thresholdFormat = tickFormat === undefined ? (d: any) => d :
        typeof tickFormat === 'string' ? d3.format(tickFormat) :
        tickFormat;

      const x: any = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

      svg.append('g')
        .selectAll('rect')
        .data(color.range())
        .join('rect')
        .attr('x', (d, i) => x(i - 1))
        .attr('y', marginTop)
        .attr('width', (d, i) => x(i) - x(i - 1))
        .attr('height', height - marginTop - marginBottom)
        .attr('fill', (d: any) => d);

      tickValues = d3.range(thresholds.length);
      tickFormat = (i: any) => thresholdFormat(thresholds[i], i);
    }
    // Ordinal
    else {
      const x: any = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

      svg.append('g')
        .selectAll('rect')
        .data(color.domain())
        .join('rect')
        .attr('x', x)
        .attr('y', marginTop)
        .attr('width', Math.max(0, x.bandwidth() - 1))
        .attr('height', height - marginTop - marginBottom)
        .attr('fill', color);

      tickAdjust = () => {};
    }

    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === 'function' ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
        .attr('x', marginLeft)
        .attr('y', marginTop + marginBottom - height - 6)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .attr('class', 'title')
        .text(title));

    return svg.node();
  }
}
