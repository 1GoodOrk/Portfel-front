import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    InputTextModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public items = [
    { label: 'About' },
    { label: 'Contacts' },
  ]

  constructor (
    private router: Router,
  ) {}

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }
}
