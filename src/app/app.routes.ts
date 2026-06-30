import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./components/user/login/login.component').then(mod => mod.LoginComponent)},
  {path: 'registration-owner', loadComponent: () => import('./components/user/registration/registration.component').then(mod => mod.RegistrationComponent)},
  {path: 'registration-expert', loadComponent: () => import('./components/user/registration/registration.component').then(mod => mod.RegistrationComponent)},
  {path: 'forget', loadComponent: () => import('./components/user/forget/forget.component').then(mod => mod.ForgetComponent)},
  {path: 'new-password', loadComponent: () => import('./components/user/password/password.component').then(mod => mod.PasswordComponent)},
  {path: 'profile', loadComponent: () => import('./components/user/profile/profile.component').then(mod => mod.ProfileComponent)},

  {path: 'main', loadComponent: () => import('./components/main/main/main.component').then(mod => mod.MainComponent)},
  {path: 'contacts', loadComponent: () => import('./components/main/contacts/contacts.component').then(mod => mod.ContactsComponent)},
  {path: 'about', loadComponent: () => import('./components/main/about/about.component').then(mod => mod.AboutComponent)},
  {path: 'terms', loadComponent: () => import('./components/main/terms/terms.component').then(mod => mod.TermsComponent)},


  {path: 'analyze', loadComponent: () => import('./components/projects/analyze/analyze.component').then(mod => mod.AnalyzeComponent)},
  {path: 'balance', loadComponent: () => import('./components/projects/balance/balance.component').then(mod => mod.BalanceComponent)},
  // {path: 'phase-risks', loadComponent: () => import('./components/projects/main/main.component').then(mod => mod.MainComponent)},
  // {path: 'phase-creation', loadComponent: () => import('./components/projects/phase/pcreation/pcreation.component').then(mod => mod.PcreationComponent)},
  // {path: 'phase-info/:id', loadComponent: () => import('./components/projects/phase/pinfo/pinfo.component').then(mod => mod.PinfoComponent)},
  // {path: 'phases-analyze', loadComponent: () => import('./components/projects/phase/panalyze/panalyze.component').then(mod => mod.PanalyzeComponent)},

  {path: '**', redirectTo: '/login' },
];
