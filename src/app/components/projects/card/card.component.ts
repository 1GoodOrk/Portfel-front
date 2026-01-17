import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { IProjectData, IProjectDataVehicle } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { InfoDialogExpertiseComponent } from '@port/shared/organisms/info-expertise-dialog/info-expertise-dialog.component';


@Component({
  selector: 'app-cog-card',
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
    MultiSelectModule,
    DatePickerModule,
    TranslatePipe,
    InfoDialogExpertiseComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @ViewChild(InfoDialogExpertiseComponent) child:InfoDialogExpertiseComponent | undefined;
  public inputs: any = {}
  public currentProject: any = {}
  public currentExpertise: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public user: any = {}
  public experts: any = []
  public expertises: any = []
  public newInputName: any = []
  public newGroupName: any = ''
  public selectedEmail: any = {}

  public visible: any = {
    expertise: false
  }
  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.httpService.getExperts()
      .subscribe((data: any) => {
        this.experts = data
      })
    this.user = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data
    this.inputs = this.appCommunicationService.getInputsForm(['risksLean', 'risksDigital', 'risksClassic'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.getAllExpertise()
  }

  public getAllExpertise() {
    this.httpService.getAllExpertise(this.currentProject._id)
      .subscribe((data: any) => {
        this.expertises = data
      })
  }

  public createExpertise() {
      const data: any = {
        email: this.selectedEmail.email,
        risksLean: {},
        risksDigital: {},
        risksClassic: {},
        recommendationDescription: '',
        status: 'NEW',
        approve: []
      }
      this.inputs.risksLean.forEach((el: any) => {
        data.risksLean[el.name] = el.value
      })
      this.inputs.risksDigital.forEach((el: any) => {
        data.risksDigital[el.name] = el.value
      })
      this.inputs.risksClassic.forEach((el: any) => {
        data.risksClassic[el.name] = {}
        el.inputs.forEach((input: any) => {
          data.risksClassic[el.name][input.name] = input.value
        })
      })
      this.httpService.addExpertise(data, this.currentProject._id)
        .subscribe((data: any) => {
          this.getAllExpertise()
      })
  }

  public removeExpertise(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeExpertise(id)
      .subscribe(() => this.getAllExpertise())
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public approveExpertise(data: any, event: any) {
    this.appCommunicationService.saveCurrentExpertise(data)
    this.navigate(`approve/${data._id}`)
  }

  public updateExpertise(data: any, event: any) {
    this.appCommunicationService.saveCurrentExpertise(data)
    this.navigate(`expertise/${data._id}`)
  }

  public showInfoDialogExpertise(index: number): void {
    Object.keys(this.expertises[index]).forEach((key: string) => {
      this.currentExpertise[key] = this.expertises[index][key]
    })
    this.appCommunicationService.saveCurrentExpertise(this.currentExpertise)
    this.child?.updateView();
    this.visible.expertise = !this.visible.expertise
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }
}
// Muda – длительное утверждение учебных планов, смет научных проектов, задержки поставки необходимого для выполнения проекта оборудования (ожидания);
// - ошибки в расчетах кредитов в учебных планах, рабочих программах, учебной и научной нагрузке преподавателя или других неточностей, требующих исправлений (дефекты);
// - избыточность данных, формализация отчетности (избыточная обработка);
// - сложная логистика утверждения внутренних и внешних документов (транспортировка);
// - создание ненужного контента или курсов, не отвечающих потребностям рынка или студентов (избыточное производство);
// - накопление устаревшего или чрезмерного дидактического материала (накопление запасов);
// - игнорирование предложений молодых преподавателей относительно инновационных методик, что приводит к «устареванию» проекта (нереализованность потенциала).
// Mura - неравномерная нагрузка на административный персонал и НПП в период вступительной кампании/начала учебного года/сессий и выпуска соискателей образования (неравномерность нагрузки);
// - неравномерность потока поставленных задач, связанных с неконтролируемым сложением требований (риски значительных колебаний времени, необходимого для реализации задач проекта);
// - неравномерность качества (риск существенной разницы в качестве преподавания между разными группами/преподавателями в рамках одного курса/проекта; квалификации кадров).
// Muri - НПП имеет чрезмерное количество различных курсов/проектов, что превышает его способность поддерживать высокое качество и соответствие лицензионным требованиям; нехватка квалифицированных кадров среди админресурса (перегрузка персонала);
// - использование устаревшего или недостаточно мощного оборудования, программного обеспечения надлежащего качества для обработки больших массивов данных проекта (перегрузка инфраструктуры);
// - установление нереалистически сжатых сроков для разработки нового образовательного проекта через внешние требования (чрезмерные требования).

// Digital – кибербезопасность (несанкционированное проникновение в компьютерную сеть ВУЗов, истоки данных, DDoS-атаки, фишинг отправки мошеннических электронных писем);
// - технические и инфраструктурные проблемы в работе ключевых систем (техническое несоответствие устаревшего оборудования, недостаточная скорость интернета);
// - низкий уровень цифровой компетентности стейкхолдеров образовательного проекта (неготовность персонала к новым цифровым системам);
// - цифровые инструменты не доступны стейхолдерам образовательного проекта (цифровые ресурсы не адаптированы для людей с особыми потребностями);
// - неэффективное использование систем дистанционного обучения, онлайн-курсов (отсутствие применения новейших цифровых инструментов и методик).

// - неконтролируемые изменения или непрерывный рост объема работ образовательного проекта;
// - текучесть кадров, в особенности высококвалифицированных профессионалов соответствующей отрасли;
// - выгорание или недостаточная мотивация ключевых членов образовательного проекта;
// - низкое методическое качество разработанных материалов;
// - несоответствие конечного продукта (образовательной программы или уровня подготовленного специалиста) образовательным стандартам или ожиданиям стейкхолдеров;
// - неэффективное взаимодействие между подразделениями (кафедры/деканаты/отделы/администрация) – стейкхолдерами образовательного проекта.
// - неконтролируемые изменения или непрерывный рост объема работ проекта, приводящих к изменению стоимости образовательного проекта;
// - неточное или неполное определение технических требований к оборудованию на этапе планирования образовательного проекта, что привело к необходимости приобретения более дорогих или дополнительных единиц оборудования (с более высокими техническими характеристиками, чем было запланировано, или из-за ошибок в расчетах количества) уже после утверждения бюджета;
// - некорректная оценка потребностей в лицензиях на программное обеспечение (ПО), включающая: использование неправильного типа лицензии (например, индивидуальная вместо корпоративной), недооценку необходимого количества пользователей/рабочих мест или несвоевременное выявление обязательности приобретения дополнительных модулей/подписок, критически необходимых для функциональности проекта;
// - недостаточное или несвоевременное финансирование.
// - неэффективный процесс согласования и утверждения (акцептирования) критической внутренней (техническая, текущая) и/или внешней (регуляторная, разрешительная) документации ответственными сторонами (внутренние стейкхолдеры, регуляторы, государственные органы), включающий бюрократические задержки, очереди, изменения требований или недостаток приоритезации;
// - неправильная оценка необходимого времени для выполнения определенных работ и разработку материалов;
// - вовлечение в образовательный проект стейкхолдеров, не имеющих необходимых навыков (например, в цифровых технологиях или новой методологии), или соответствующей квалификации (привлечение НПП, не отвечающих лицензионным требованиям), или они перегружены другими обязанностями и срывают сроки проекта;
// - не введена вовремя в эксплуатацию, техническая несовместимость или отказ технических систем (учебные платформы Moodle, облачные хранилища, лаборатории), необходимые для запуска образовательного проекта;
// - вовремя несогласованные между стейхолдерами смета, графики работ и время их выполнения;
// - своевременное неприобретение или приобретение некорректного или устаревшего оборудования (например, интерактивных досок, компьютеров, лабораторных стендов), необходимого для реализации практической части образовательного проекта.
