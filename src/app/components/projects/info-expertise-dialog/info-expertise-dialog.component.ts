import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import * as d3 from 'd3';

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';


@Component({
  selector: 'app-info-expertise-dialog',
  standalone: true,
  imports: [
    DialogModule,
    DividerModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './info-expertise-dialog.component.html',
  styleUrl: './info-expertise-dialog.component.scss'
})
export class InfoDialogExpertiseComponent {
  public current: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public results: any = {
    risksLean: { label: 'pages.project.science.risksLeanCalucationLabel', value: 0 },
    risksDigital: { label: 'pages.project.science.risksDigitalCalucationLabel', value: 0 },
    risksClassic: { label: 'pages.project.science.risksClassicCalucationLabel', value: 0 },
  }
  public infoPageProjectValueKeys: any = []
  public riskClassicGroupData: any = {}

  constructor (
    private router: Router,
    private appCommunicationService: AppCommunicationService,
  ) {
    this.current = this.appCommunicationService.getCurrentExpertise()
    this.updateView()
    this.resultCalculation()
  }

  public updateView() {
    this.infoPageProjectValueKeys = [
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksLean'),
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksDigital'),
      ...this.appCommunicationService.getDynamicValueKeys('risksClassic', this.current)
    ]
    Array.from(this.appCommunicationService.getDynamicValueKeys('risksClassic', this.current))
      .filter((el: any) => el.type && el.type !== 'divider')
      .forEach((el: any) => {
        this.riskClassicGroupData[el.label] = {
          tableParams: Object.assign(this.current.risksClassicTables[el.label].tableParams),
          analyzeTable: Object.assign(this.current.risksClassicTables[el.label].analyzeTable),
          graph: {}
        }
        console.log(this.riskClassicGroupData[el.label].tableParams)
        this.createCharts(el.label)
      })
  }

  private resultCalculation(): void {
    Object.keys(this.current.risksLean).forEach((key: string) => {
      this.results.risksLean.value += this.current.risksLean[key]
    })
    this.results.risksLean.value = (this.results.risksLean.value / Object.keys(this.current.risksLean).length).toFixed(2)
    Object.keys(this.current.risksDigital).forEach((key: string) => {
      this.results.risksDigital.value += this.current.risksDigital[key]
    })
    this.results.risksDigital.value = (this.results.risksDigital.value / Object.keys(this.current.risksDigital).length).toFixed(2)
    Object.keys(this.current.risksClassic).forEach((keyGroup: string) => {
      this.results.risksClassic.value += Object.keys(this.current.risksClassic[keyGroup])
        .reduce((prev: number, next: any) => this.current.risksClassic[keyGroup][next] ?
          prev * this.current.risksClassic[keyGroup][next] :
          prev, 1) ** (1 / Object.keys(this.current.risksClassic[keyGroup]).length)
    })
    this.results.risksClassic.value = this.results.risksClassic.value.toFixed(2)
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

  async createCharts(groupName: string) {
    const links: any = []
    this.riskClassicGroupData[groupName].tableParams.td.forEach((td: any) => {
      td.forEach((elTd: any, tdIndex: number) => {
        if (!isNaN(elTd) && elTd !== 0) {
          links.push({ source: td[0], target: this.riskClassicGroupData[groupName].tableParams.th[tdIndex], type: elTd > 0 ? '+' : '-' })
        }
      })
    })

    const data = {
      nodes: Array.from(new Set(links.flatMap((l: any) => [l.source, l.target])), id => ({
        id
      })),
      links
    };

    const chart = this.mobilePatentSuits(data, {svgId: `mobile-patent-suits-${groupName}`});
    // const chartSwatches = this.swatches(chart.scales.color);
    if (links.length) {
      setTimeout(() => {
        const elem: any = document.getElementById(`model-container-${groupName}`);
        elem.append(chart)
      }, 500)
    }

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
