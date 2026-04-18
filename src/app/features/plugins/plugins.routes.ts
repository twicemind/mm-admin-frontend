import { Routes } from '@angular/router';
import { PluginsOverviewComponent } from './plugins-overview/plugins-overview.component';

export const PLUGINS_ROUTES: Routes = [
  { path: '', component: PluginsOverviewComponent },
  { path: 'modules', loadComponent: () => import('./modules/modules.component').then(m => m.ModulesComponent) },
  { path: 'magicmirror-config', loadComponent: () => import('./magicmirror-config/magicmirror-config.component').then(m => m.MagicmirrorConfigComponent) },
  { path: 'magicmirror-update', loadComponent: () => import('./magicmirror-update/magicmirror-update.component').then(m => m.MagicmirrorUpdateComponent) },
  { path: 'docker-update', loadComponent: () => import('./docker-update/docker-update.component').then(m => m.DockerUpdateComponent) },
  { path: 'system-update', loadComponent: () => import('./system-update/system-update.component').then(m => m.SystemUpdateComponent) },
  { path: 'wlan', loadComponent: () => import('./wlan/wlan.component').then(m => m.WlanComponent) }
];
