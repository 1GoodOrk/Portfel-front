import { Component, AfterContentInit } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import * as d3 from 'd3';
// import {Swatches} from "@d3/color-legend"

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    FormsModule,
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
    TableModule,
    TranslatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements AfterContentInit {
  paramsForm: any = []

  tableParams: any = {
    th: ['\\', 'T', 'S', 'E', 'Ec', 'С', 'Te', 'I', 'Se', 'M', 'R'],
    td: [['T', 0, 7, 9, -5, 7, 8, 8, 9, 8, -10],
      ['S', 7, 0, 7, 0, 9, 5, 0, 9, 8, -9],
      ['E', 9, 3, 0, 5, 8, 7, 0, 8, 0, 7],
      ['Ec', -5, 0, 5, 0, 3, -5, 0, -3, -6, -5],
      ['С', 7, 9, 8, 3, 0, 9, 10, 8, 5, -10],
      ['Te', 8, 5, 7, -5, 9, 0, 0, 8, 0, -9],
      ['I', 8, 0, 0, 0, 10, 0, 0, 10, 0, -10],
      ['Se', 9, 9, 8, -3, 8, 8, 10, 0, 8, -10],
      ['M', 8, 8, 0, -6, 5, 0, 0, 8, 0, 8],
      ['R', -10, -9, 7, -5, -10, -9, -10, -10, 8, 0]
    ]
  }
  analyzeTable: any = {
    mostConnectionAmount: { name: '', value: 0 },
    lessConnectionAmount: { name: '', value: 20 },
    mostNegativeConnectionAmount: { name: '', value: 0 },
    mostPositiveConnectionAmount: { name: '', value: 0 },
    mostInfluenceAmount: { name: '', value: 0 },
    lessInfluenceAmount: { name: '', value: 100 }
  }

  formParams: any = [
    { name: 'T', label: 'Транспорт, T', tooltip: 'Забезпечення надійного, швидкого та зручного перевезення пасажирів', value: 0 },
    { name: 'S', label: 'Соціальний / інклюзивний, S', tooltip: 'Доступність послуг для різних категорій населення у тому числі для людей з особливими потребами', value: 0 },
    { name: 'E', label: 'Економічний, E', tooltip: 'Оптимізація витрат для пасажирів та підвищення прибутковості перевізника', value: 0 },
    { name: 'Ec', label: 'Екологічний, Ec', tooltip: 'Мінімізація впливу на навколишнє середовище шляхом впровадження сучасних екологічних рішень', value: 0 },
    { name: 'C', label: 'Комфорт, C', tooltip: 'Створення умов, які підвищують задоволеність клієнтів від користування послугами (зручність, якість)', value: 0 },
    { name: 'Te', label: 'Технологічний, Te', tooltip: 'Використання інновацій для підвищення ефективності перевезень (автоматизація процесів)', value: 0 },
    { name: 'I', label: 'Інформативний, I', tooltip: 'Надавання пасажирам актуальної інформації щодо маршрутів, графіків та послуг', value: 0 },
    { name: 'Se', label: 'Безпека, Se', tooltip: 'Забезпечення високого рівня безпеки під час перевезення', value: 0 },
    { name: 'M', label: 'Управління та регулятори, M', tooltip: 'Забезпечення політики державного регулювання в сфері транспорту, взаємодія з органами місцевого самоврядування, планування та оптимізація транспортних потоків, рівень інтеграції різних видів транспорту', value: 0 },
    { name: 'R', label: 'Ризики, R', tooltip: 'Економічні, соціальні, технологічні, екологічні, управлінські та безпекові аспекти, впливаючи на стабільність, ефективність та комфорт транспортної системи', value: 0 }
  ]

  private debounceTimeout: any
  ngAfterContentInit(): void {
    this.analyzeTableData()
    this.createCharts()
  }

  refreshModel() {
    const targetPrevVersion: any = document.getElementById('mobile-patent-suits');
    targetPrevVersion.remove();
    this.createCharts()
  }

  analyzeTableData(): void {
    this.tableParams.td.forEach((el: any) => {
      const current: any = {
        connectionAmount: 0,
        mostNegativeConnectionAmount: 0,
        mostPositiveConnectionAmount: 0,
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
      if (this.analyzeTable.mostConnectionAmount.value < current.connectionAmount) {
        this.analyzeTable.mostConnectionAmount = { name: el[0], value: current.connectionAmount }
      }
      if (this.analyzeTable.lessConnectionAmount.value > current.connectionAmount) {
        this.analyzeTable.lessConnectionAmount = { name: el[0], value: current.connectionAmount }
      }
      if (this.analyzeTable.mostNegativeConnectionAmount.value < current.mostNegativeConnectionAmount) {
        this.analyzeTable.mostNegativeConnectionAmount = { name: el[0], value: current.mostNegativeConnectionAmount }
      }
      if (this.analyzeTable.mostPositiveConnectionAmount.value < current.mostPositiveConnectionAmount) {
        this.analyzeTable.mostPositiveConnectionAmount = { name: el[0], value: current.mostPositiveConnectionAmount }
      }
      if (this.analyzeTable.mostInfluenceAmount.value < current.influenceAmount) {
        this.analyzeTable.mostInfluenceAmount = { name: el[0], value: current.influenceAmount }
      }
      if (this.analyzeTable.lessInfluenceAmount.value > current.influenceAmount) {
        this.analyzeTable.lessInfluenceAmount = { name: el[0], value: current.influenceAmount }
      }
    })
  }


  onTableChange(newData: any, rowName: string, index: number) {
    clearTimeout(this.debounceTimeout)
    this.debounceTimeout = setTimeout(() => {
      const rowIndex: number = this.tableParams.td.findIndex((el: any) => el[0] === rowName)
      this.tableParams.td[rowIndex][index] = newData
      this.analyzeTableData()
      this.refreshModel()
    }, 500)
  }

  onChange(newObj: any, paramName: string) {
    const  index: number = this.formParams.findIndex((el: any) => el.name === paramName)
    const paramsCogModel: any = []
    this.tableParams.td.forEach((td: any) => {
      const influence: any = []
      td.forEach((elTd: any, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0) {
          influence.push({ name: this.tableParams.th[tdIndex], value: elTd })
        }
      })
      paramsCogModel.push({ name: td[0], influence })
    })
    paramsCogModel
      .find((el: any) => el.name === paramName)
      .influence.forEach((inf: any) => {
        const indexParams: number = this.formParams.findIndex((el: any) => el.name === inf.name)
        if (indexParams > -1) {
          this.formParams[indexParams].value = this.formParams[indexParams].value + (newObj - this.formParams[index].value) * inf.value
        }
      })
      this.formParams[index].value = newObj
  }

  async createCharts() {
    // const links = await d3.csv('./data.csv');
    const links: any = []
    this.tableParams.td.forEach((td: any) => {
      td.forEach((elTd: any, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0) {
          links.push({ source: td[0], target: this.tableParams.th[tdIndex], type: elTd > 0 ? '+' : '-' })
        }
      })
    })

    const data = {
      nodes: Array.from(new Set(links.flatMap((l: any) => [l.source, l.target])), id => ({
        id
      })),
      links
    };

    const chart = this.mobilePatentSuits(data);

    // const chartSwatches = this.swatches(chart.scales.color);

    d3.select('.model-container').append(() => chart);
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
