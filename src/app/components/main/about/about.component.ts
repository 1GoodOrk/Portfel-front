import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent, CardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
