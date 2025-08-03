import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    InputTextModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor (private router: Router) {}

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }
}
