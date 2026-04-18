import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface Plugin {
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-plugins-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './plugins-overview.component.html',
  styleUrls: ['./plugins-overview.component.scss']
})
export class PluginsOverviewComponent {
  plugins: Plugin[] = [
    {
      name: 'NAV.MODULES',
      description: 'Verwalten Sie MagicMirror Module',
      icon: 'view_module',
      route: '/plugins/modules',
      color: '#2196f3'
    },
    {
      name: 'NAV.MAGICMIRROR_CONFIG',
      description: 'Konfigurieren Sie Ihr MagicMirror',
      icon: 'settings',
      route: '/plugins/magicmirror-config',
      color: '#4caf50'
    },
    {
      name: 'NAV.MAGICMIRROR_UPDATE',
      description: 'MagicMirror aktualisieren',
      icon: 'system_update',
      route: '/plugins/magicmirror-update',
      color: '#ff9800'
    },
    {
      name: 'NAV.DOCKER_UPDATE',
      description: 'Docker Container aktualisieren',
      icon: 'cloud_upload',
      route: '/plugins/docker-update',
      color: '#00bcd4'
    },
    {
      name: 'NAV.SYSTEM_UPDATE',
      description: 'System Updates durchführen',
      icon: 'security_update',
      route: '/plugins/system-update',
      color: '#9c27b0'
    },
    {
      name: 'NAV.WLAN',
      description: 'WLAN Einstellungen verwalten',
      icon: 'wifi',
      route: '/plugins/wlan',
      color: '#f44336'
    }
  ];
}
