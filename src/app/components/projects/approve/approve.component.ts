import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from "@ngx-translate/core";
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DialogModule,
    DividerModule,
    TextareaModule,
    FormsModule,
    TranslatePipe,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.scss',
})
export class ApproveComponent {
  public current: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public approvedFields: any = {}
  public decisionDescription: string = ''
  public recommendationApprove: boolean = true

  public infoPageProjectValueKeys: any = []

  constructor (
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService,
  ) {
    this.pre()
  }

  private pre() {
    this.current = this.appCommunicationService.getCurrentExpertise()
    this.approvedFields = this.appCommunicationService.getDynamicApproveKeys('risksClassic', this.current)
    this.infoPageProjectValueKeys = [
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksLean'),
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksDigital'),
      ...this.appCommunicationService.getDynamicValueKeys('risksClassic', this.current)
    ]
    if (this.current.approve && this.current.approve.length) {
      const currentUserMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
      const currentApproveIndex = this.current.approve.findIndex((el: any) => el.email === currentUserMail)
      this.decisionDescription = this.current.approve[currentApproveIndex].decisionDescription
      this.recommendationApprove = this.current.approve[currentApproveIndex].recommendationApprove
      Object.keys(this.current.approve[currentApproveIndex].items).forEach((key: string) => {
        Object.keys(this.current.approve[currentApproveIndex].items[key]).forEach((keyData: string) => {
          this.approvedFields[key][keyData] = this.current.approve[currentApproveIndex].items[key][keyData]
        })
      })
    }
  }

  public approve(mode: string, label: string, propName?: string) {
    if (mode === 'group') {
      Object.keys(this.approvedFields[label]).forEach((key: string) => {
        this.approvedFields[label][key] = true
      })
    } else {
      // TODO: type error
      // @ts-expect-error
      this.approvedFields[label][propName] = true
    }
  }

  public unapprove(mode: string, label: string, propName?: string) {
    if (mode === 'group') {
      Object.keys(this.approvedFields[label]).forEach((key: string) => {
        this.approvedFields[label][key] = false
      })
    } else {
      // TODO: type error
      // @ts-expect-error
      this.approvedFields[label][propName] = false
    }
  }

  private checkIfApprovedAllFields(): boolean {
    return !Object.keys(this.approvedFields).find((key: string) =>
      Object.keys(this.approvedFields[key]).find((keyData: string) => !this.approvedFields[key][keyData])
    )
  }

  public finish() {
    if (this.checkIfApprovedAllFields() && this.recommendationApprove) {
      this.current.status = 'pages.project.science.approvedStatus'
    } else {
      this.current.status = 'pages.project.science.unapprovedStatus'
    }
    const currentUserMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
    if (!this.current.approve) {
      this.current.approve = []
    }
    let currentApproveIndex = this.current.approve.length
    if (this.current.approve.findIndex((el: any) => el.email === currentUserMail) !== -1) {
      currentApproveIndex = this.current.approve.findIndex((el: any) => el.email === currentUserMail)
    } else {
      this.current.approve.push({ items: {} })
    }
    Object.keys(this.approvedFields).forEach((key: string) => {
      this.current.approve[currentApproveIndex].items[key] = {}
      Object.keys(this.approvedFields[key]).forEach((keyData: string) => {
        this.current.approve[currentApproveIndex].items[key][keyData] = this.approvedFields[key][keyData]
      })
    })
    this.current.approve[currentApproveIndex].email = currentUserMail
    this.current.approve[currentApproveIndex].decisionDescription = this.decisionDescription
    this.current.approve[currentApproveIndex].recommendationApprove = this.recommendationApprove
    this.httpService.updateExpertise(this.current)
      .subscribe(() => {
        this.back()
    })
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }
}
