import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

import { BarChart } from 'echarts/charts';
import { GraphChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, LegendComponent } from 'echarts/components';
echarts.use([
  BarChart,
  GraphChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
]);

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { ScrollerModule } from 'primeng/scroller';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { OrganizationChartModule } from 'primeng/organizationchart';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import exp from '@port/asserts/data/fake-data/experimantal-tree.json'

@Component({
  selector: 'app-stackholder-balance',
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
    DialogModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    TableModule,
    TooltipModule,
    MultiSelectModule,
    DatePickerModule,
    ScrollerModule,
    OrganizationChartModule,
    TranslatePipe,
    NgxEchartsDirective
  ],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stackholder.component.html',
  styleUrl: './stackholder.component.scss',
})
export class StackholderBalanceComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public timeOut: any
  @Output() updateView = new EventEmitter();

  // data: any[] = [{
  //   key: '0',
  //   label: 'Founder',
  //   children: [
  //     {
  //       key: '0-0',
  //       label: 'Product Lead',
  //       children: [
  //         {
  //           key: '0-0-0',
  //           label: 'UX/UI Designer'
  //         },
  //         {
  //           key: '0-0-1',
  //           label: 'Product Manager'
  //         }
  //       ]
  //     },
  //     {
  //       key: '0-1',
  //       label: 'Engineering Lead',
  //       children: [
  //         {
  //           key: '0-1-0',
  //           label: 'Frontend Developer'
  //         },
  //         {
  //           key: '0-1-1',
  //           label: 'Backend Developer'
  //         }
  //       ]
  //     }
  //   ]
  // }];

  // option = {

  // };
  chartOption: any = {
  // chartOption: echarts.EChartsCoreOption = {
    tooltip: {},
    legend: [
      {
        data: exp.categories.map(function (a: any) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'Форум',
        type: 'graph',
        layout: 'none',
        data: exp.nodes,
        links: exp.links,
        categories: exp.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  }

  // {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //     },
  //   ],
  // };

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['stackholdersBalance'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public removeStackholder(index: number) {
    this.currentProject.balance.stackholders.splice(index, 1)
    this.updateProjectRequest()
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      if (!this.currentProject.balance || !this.currentProject.balance.stackholders) {
        this.currentProject.balance = { stackholders: [] }
      }
      this.currentProject.balance.stackholders.push({})
      this.inputs.stackholdersBalance.forEach((input: any) => {
        if (input.name) {
          this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1][input.name] = input.value
        }
      })
      this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].SEI =
        this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].ti * (this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].wti / 100) +
        this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].ssi * (this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].wssi / 100) +
        this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].ari * (this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].wari / 100) +
        this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].ci * (this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1].wci / 100)
      this.updateProjectRequest()
    }
  }

  private updateProjectRequest () {
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.stackholdersBalance = this.inputs.stackholdersBalance.map((input: any) => {
          input.value = ''
          return input
        })
        // this.chartRefresh()
      })
  }

  chartInstance: any
  public onChartInit(instance: any) {
    this.chartInstance = instance;
    // console.log(this.chartInstance)
    this.chartRefresh()
  }

  private chartRefresh() {
    const data: any = {
      nodes: [
        {
          "id": "1",
          "name": "Форум",
          "symbolSize": 70,
          "x": -290,
          "y": 290,
          "value": 100,
          "category": 1
        },
      ],
      links: [],
      categories: [{
        "name": "Головна"
      }],
      posBig: { x: 100, y: 100 },
      posSmall: { x: 0, y: 0 }
    }
    this.currentProject.balance.stackholders.forEach((stackholder: any, i: number) => {
      data.categories.push({
        "name": `${stackholder.type} (${stackholder.name})`
      })
      data.posBig.x = data.posBig.x * -1
      data.posBig.y = data.posBig.y - 25
      data.nodes.push({
        "id": `${2 + i}`,
        "name": `${stackholder.type} (${stackholder.name})`,
        "symbolSize": 50,
        "x": data.posBig.x,
        "y": data.posBig.y,
        "value": 50,
        "category": data.categories.length
      })
      data.links.push({
        "source": "1",
        "target": `${2 + i}`
      })
      stackholder.name.split(', ').forEach((name: string, ind: number) => {
        data.posSmall.x = data.posBig.x > 0 ? data.posBig.x + 10 : data.posBig.x - 10
        data.posSmall.y = data.posBig.y > 0 ? data.posBig.y + 10 : data.posBig.y - 10
        data.nodes.push({
          "id": `${2 + i}${ind}`,
          "name": name,
          "symbolSize": 25,
          "x": data.posSmall.x,
          "y": data.posSmall.y,
          "value": 10,
          "category": data.categories.length
        })
        data.links.push({
          "source": `${2 + i}`,
          "target": `${2 + i}${ind}`
        })
      })
    });
    console.log(213, data, exp)

    this.chartInstance.setOption({
      tooltip: {},
      legend: [
        {
          data: data.categories.map(function (a: any) {
            return a.name;
          })
        }
      ],
      series: [
        {
          name: 'Форум',
          type: 'graph',
          layout: 'none',
          data: data.nodes,
          links: data.links,
          categories: data.categories,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ]
    }, { notMerge: true })
    this.chartInstance.setOption({})
  }
}
