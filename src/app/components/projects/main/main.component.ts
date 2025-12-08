import { Component } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-main',
  imports: [
    AccordionModule,
    HeaderComponent,
    FooterComponent,
    CardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

}
