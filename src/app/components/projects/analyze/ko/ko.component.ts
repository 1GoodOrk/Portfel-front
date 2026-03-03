import { Component, AfterContentInit } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

@Component({
  selector: 'app-ko',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    StepperModule,
    TranslatePipe,
    TableModule
  ],
  templateUrl: './ko.component.html',
  styleUrl: './ko.component.scss',
})
export class KOComponent implements AfterContentInit {
  public inputs: any = []
  public currentProject: any = {}
  public currentExpertise: any = {}
  public riskData: any = {}
  public recommendationDescription: string = ''
  public currentSessionMail: string = ''

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.pre()
  }

  private pre(): void {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.currentExpertise = this.appCommunicationService.getCurrentExpertise()
    this.currentSessionMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
    this.inputs = this.appCommunicationService.getDynamicKOInputsForm(this.currentExpertise.approve.fields, this.currentSessionMail, this.inputs)

    if (this.currentExpertise.risksData && this.currentExpertise.risksData.findIndex((riskData: any) => riskData.email === this.currentSessionMail) !== -1) {
      const currentDataIndex = this.currentExpertise.risksData.findIndex((riskData: any) => riskData.email === this.currentSessionMail)
      this.recommendationDescription = this.currentExpertise.risksData[currentDataIndex].recommendationDescription
      this.riskData = {
        tableParams: Object.assign(this.currentExpertise.risksData[currentDataIndex].tableParams),
        analyzeTable: Object.assign(this.currentExpertise.risksData[currentDataIndex].analyzeTable),
      }
      if (this.currentExpertise.risksData[currentDataIndex].additionalTableParams) {
        this.riskData.additionalTableParams = Object.assign(this.currentExpertise.risksData[currentDataIndex].additionalTableParams)
      }
    } else {
      this.riskData = {
        tableParams: {
          th: ['/', ...Array.from(this.inputs).map((input: any) => input.label)],
          td: Array.from(this.inputs).map((input: any) => {
            return [input.label, ... Array.from(this.inputs).map((data: any, index: number) => 0)]
          })
        },
        additionalTableParams: {
          th: ['/', 'Djin', 'Djout', 'Djinout'],
          td: Array.from(this.inputs).map((input: any) => {
            return [input.label, 0, 0, 0]
          })
        },
        analyzeTable: {
          mostConnectionAmount: { value: 0, name: '-' },
          lessConnectionAmount: { value: 0, name: '-' },
          mostNegativeConnectionAmount: { value: 0, name: '-' },
          mostPositiveConnectionAmount: { value: 0, name: '-' },
          mostInfluenceAmount: { value: 0, name: '-' },
          lessInfluenceAmount: { value: 0, name: '-' }
        },
        graph: {}
      }
    }
    this.tableDataAdditional()
    this.analyzeTableData()
    this.refreshModel()
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

  public updateExpertise(form: any) {
    if (form.valid) {
      this.inputs.forEach((input: any) => {
        const updateFieldIndex = this.currentExpertise.approve.fields.findIndex((field: any) => field.label === input.label)
        const approveIndex = this.currentExpertise.approve.fields[updateFieldIndex].approve.findIndex((appr: any) => appr.email === this.currentSessionMail)
        this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].value = input.value
      });
      if (!this.currentExpertise.risksData) {
        this.currentExpertise.risksData = []
      }
      const findRisksDataIndex = this.currentExpertise.risksData.findIndex((riskData: any) => riskData.email === this.currentSessionMail)
      if (findRisksDataIndex !== -1) {
        this.currentExpertise.risksData[findRisksDataIndex].tableParams = this.riskData.tableParams
        this.currentExpertise.risksData[findRisksDataIndex].analyzeTable = this.riskData.analyzeTable
        this.currentExpertise.risksData[findRisksDataIndex].additionalTableParams = this.riskData.additionalTableParams
        this.currentExpertise.risksData[findRisksDataIndex].recommendationDescription = this.recommendationDescription
      } else {
        this.currentExpertise.risksData.push({
          email: this.currentSessionMail,
          tableParams: this.riskData.tableParams,
          additionalTableParams: this.riskData.additionalTableParams,
          analyzeTable: this.riskData.analyzeTable,
          recommendationDescription: this.recommendationDescription
        })
      }
      if (this.currentExpertise.status === 'ОЦІНКА' && this.currentExpertise.risksData.length === this.currentExpertise.email.length) {
        this.currentExpertise.status = 'ЗАКІНЧЕНО'
      }
      this.gradeCalculation()
      this.httpService.updateExpertise(this.currentExpertise)
        .subscribe((data: any) => {})
    }
  }

  gradeCalculation() {
    this.currentExpertise.approve.grade = 0
    this.currentExpertise.approve.grade = (this.currentExpertise.approve.fields.reduce((prevField: number, nextFields: any) => {
      const currentApproveIndex = nextFields.approve.findIndex((appr: any) => appr.email === this.currentSessionMail)
      return nextFields.approve[currentApproveIndex].value ? prevField * nextFields.approve[currentApproveIndex].value : prevField
    }, 1) ** (1 / this.currentExpertise.approve.fields.length)).toFixed(2)
  }

  private debounceTimeout: any
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.tableDataAdditional()
      this.analyzeTableData()
      this.refreshModel()
    }, 500)
  }

  refreshModel() {
    let targetPrevVersion: any = document.getElementById('mobile-patent-suits-KO')
    while (targetPrevVersion) {
      targetPrevVersion.remove();
      targetPrevVersion = document.getElementById('mobile-patent-suits-KO')
    }
    this.createCharts()
  }

  analyzeTableData(): void {
    this.riskData.tableParams.td.forEach((el: any) => {
      const current: any = {
        connectionAmount: 0,
        mostPositiveConnectionAmount: 0,
        mostNegativeConnectionAmount: 0,
        influenceAmount: 0
      }
      el
        .filter((subEl: any) => !isNaN(subEl) && subEl)
        .forEach((el: any) => {
          current.connectionAmount++
          if (el > 0) {
            current.mostPositiveConnectionAmount++
          } else {
            current.mostNegativeConnectionAmount++
          }
          current.influenceAmount += el
        })
      if (this.riskData.analyzeTable.mostConnectionAmount.value < current.connectionAmount) {
        this.riskData.analyzeTable.mostConnectionAmount = { name: el[0], value: current.connectionAmount }
      }
      if (this.riskData.analyzeTable.lessConnectionAmount.value > current.connectionAmount) {
        this.riskData.analyzeTable.lessConnectionAmount = { name: el[0], value: current.connectionAmount }
      }
      if (this.riskData.analyzeTable.mostNegativeConnectionAmount.value < current.mostNegativeConnectionAmount) {
        this.riskData.analyzeTable.mostNegativeConnectionAmount = { name: el[0], value: current.mostNegativeConnectionAmount }
      }
      if (this.riskData.analyzeTable.mostPositiveConnectionAmount.value < current.mostPositiveConnectionAmount) {
        this.riskData.analyzeTable.mostPositiveConnectionAmount = { name: el[0], value: current.mostPositiveConnectionAmount }
      }
      if (this.riskData.analyzeTable.mostInfluenceAmount.value < current.influenceAmount) {
        this.riskData.analyzeTable.mostInfluenceAmount = { name: el[0], value: current.influenceAmount }
      }
      if (this.riskData.analyzeTable.lessInfluenceAmount.value > current.influenceAmount) {
        this.riskData.analyzeTable.lessInfluenceAmount = { name: el[0], value: current.influenceAmount }
      }
    })
  }

  public tableDataAdditional() {
    this.riskData.additionalTableParams = {
      th: ['/', 'Djin', 'Djout', 'Djinout'],
      td: Array.from(this.inputs).map((input: any) => {
        // @ts-expect-error
        const Djin: any = Array
          .from(this.riskData.tableParams.td)
          .find((data: any) => data[0] === input.label)
          .filter((data: any) => !isNaN(data))
          .reduce((prev: any, next: any) => prev + next, 0)
        const keyIndex = this.riskData.tableParams.th.findIndex((key: string) => key === input.label)
        const Djout: any = Array
          .from(this.riskData.tableParams.td)
          .reduce((prev: any, next: any) => prev + next[keyIndex], 0)
        return [input.label, Djin, Djout, Djin + Djout]
      })
    }
  }

  onTableChange(newData: any, rowName: string, index: number) {
    clearTimeout(this.debounceTimeout)
    this.debounceTimeout = setTimeout(() => {
      const rowIndex: number = this.riskData.tableParams.td.findIndex((el: any) => el[0] === rowName)
      this.riskData.tableParams.td[rowIndex][index] = newData
      this.tableDataAdditional()
      this.analyzeTableData()
      this.refreshModel()
    }, 500)
  }

  onChange(newObj: any, indexInput: number) {
    const paramsCogModel: any = []
    const tableInfluenceIndex = this.riskData.tableParams.th.findIndex((key: string) => key === this.inputs[indexInput].label)
    this.riskData.tableParams.td.forEach((td: any) => {
      const influence: any = []
      td.forEach((elTd: any, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0) {
          influence.push({ name: this.riskData.tableParams.th[tdIndex], value: elTd })
        }
      })
      paramsCogModel.push({ name: td[0], influence })
    })
    paramsCogModel
      .find((el: any) => el.name === this.inputs[indexInput].label)
      .influence.forEach((inf: any) => {
        const indexParams: number = this.inputs.findIndex((el: any) => el.label === inf.name)
        if (indexParams > -1) {
          this.inputs[indexParams].value =
            this.inputs[indexParams].value +
            (newObj - this.inputs[indexInput].value) * inf.value
          if (this.inputs[indexParams].value < 0) {
            this.inputs[indexParams].value = 0
          }
        }
      })
    this.inputs[indexInput].value = newObj
  }

  async createCharts() {
    const links: any = []
    this.riskData.tableParams.td.forEach((td: any) => {
      td.forEach((elTd: any, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0) {
          links.push({
            source: td[0].match('page') ? td[0].split('.')[td[0].split('.').length - 1] : td[0],
            target: this.riskData.tableParams.th[tdIndex].match('page') ?
              this.riskData.tableParams.th[tdIndex].split('.')[this.riskData.tableParams.th[tdIndex].split('.').length - 1] :
              this.riskData.tableParams.th[tdIndex],
            type: elTd > 0 ? '+' : '-'
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
    if (data.links.length) {
      this.riskData.graph = { data: {} }
      const chart = this.mobilePatentSuits(data, {svgId: 'mobile-patent-suits-KO'});
      const elem: any = document.getElementById('model-container-KO');
      if (elem) {
        setTimeout(() => {
          elem.append(chart)
        }, 1000)
      }
    }

    // const chartSwatches = this.swatches(chart.scales.color);
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
