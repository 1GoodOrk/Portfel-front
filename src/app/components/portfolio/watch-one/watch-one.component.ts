import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderComponent } from '../../shared/organisms/header/header.component';
import { FooterComponent } from '../../shared/organisms/footer/footer.component';
import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-watch-one',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    TooltipModule,
    TranslatePipe
  ],
  templateUrl: './watch-one.component.html',
  styleUrl: './watch-one.component.scss'
})
export class WatchOneComponent {
  public data = {
    name: '',
    img: '',
    des: '',
    projects: 0,
    budget: 0,
    duration: 0,
    workAmount: 0,
    townOnly: false,
    town: '',
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }
  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
    // this.appCommunicationService.getCurrentPortfolio()
    // .subscribe((data: any) => {
    //   console.log(1)
    //   this.data = data
    // })
      // .subscribe({
      //   next: this.handleUpdateResponse.bind(this)
      // })
  }

  // private handleUpdateResponse(data: any): void {
  //   console.log(1)
  //   this.data = data
  // }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }
}
