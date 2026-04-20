import { Routes } from '@angular/router';
import { PluginsOverviewComponent } from './plugins-overview/plugins-overview.component';

export const PLUGINS_ROUTES: Routes = [
  { 
    path: '', 
    component: PluginsOverviewComponent 
  },
  {
    path: 'system-monitor',
    loadComponent: () => import('./system-monitor/system-monitor.component').then(m => m.SystemMonitorComponent)
  }
];
