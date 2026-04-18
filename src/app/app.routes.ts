import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'plugins', 
    loadChildren: () => import('./features/plugins/plugins.routes').then(m => m.PLUGINS_ROUTES)
  },
  { path: '**', redirectTo: '/dashboard' }
];
