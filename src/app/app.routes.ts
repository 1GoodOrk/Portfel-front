import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./components/user/login/login.component').then(mod => mod.LoginComponent)},
  {path: 'registration', loadComponent: () => import('./components/user/registration/registration.component').then(mod => mod.RegistrationComponent)},
  {path: 'forget', loadComponent: () => import('./components/user/forget/forget.component').then(mod => mod.ForgetComponent)},
  {path: 'new-password', loadComponent: () => import('./components/user/password/password.component').then(mod => mod.PasswordComponent)},
  {path: 'profile', loadComponent: () => import('./components/user/profile/profile.component').then(mod => mod.ProfileComponent)},

  {path: 'main', loadComponent: () => import('./components/main/main/main.component').then(mod => mod.MainComponent)},
  {path: 'contacts', loadComponent: () => import('./components/main/contacts/contacts.component').then(mod => mod.ContactsComponent)},
  {path: 'about', loadComponent: () => import('./components/main/about/about.component').then(mod => mod.AboutComponent)},
  {path: 'terms', loadComponent: () => import('./components/main/terms/terms.component').then(mod => mod.TermsComponent)},


  {path: 'analyze', loadComponent: () => import('./components/projects/analyze/analyze.component').then(mod => mod.AnalyzeComponent)},
  {path: 'analyze-butterfly', loadComponent: () => import('./components/projects/analyze/butterfly-method/butterfly-method.component').then(mod => mod.ButterflyMethodComponent)},
  {path: 'analyze-stairs', loadComponent: () => import('./components/projects/analyze/stairs-method/stairs-method.component').then(mod => mod.StairsMethodComponent)},
  {path: 'analyze-solution', loadComponent: () => import('./components/projects/analyze/solutions/solutions.component').then(mod => mod.SolutionsComponent)},
  {path: 'analyze-solution/current/:id', loadComponent: () => import('./components/projects/analyze/solutions/current/current.component').then(mod => mod.CurrentComponent)},

  {path: '**', redirectTo: '/login' },
];
