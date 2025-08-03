import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderComponent } from '../../shared/organisms/header/header.component';
import { FooterComponent } from '../../shared/organisms/footer/footer.component';
import { HttpService } from '@port/services/http.service';
@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    TooltipModule,
    TranslatePipe
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  public data = {
    name: 'Test',
    img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    projects: 14,
    budget: 1000000,
    duration: 60,
    workAmount: 15,
    townOnly: false,
    town: 'Полтава',
    options: {
      eco: 3,
      war: 5,
      log: 9,
      soc: 5,
      struc: 2
    }
  }
  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public createPorfolio(): void {
    this.showSpinner = true
    this.httpService.createPortfolio(this.data)
      .subscribe(() => {
        this.showSpinner = false
      })
  }
}
