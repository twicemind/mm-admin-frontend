import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      label: 'NAV.DASHBOARD',
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      label: 'NAV.PLUGINS',
      route: '/plugins',
      icon: 'extension',
      children: [
        {
          label: 'NAV.MODULES',
          route: '/plugins/modules',
          icon: 'view_module'
        },
        {
          label: 'NAV.MAGICMIRROR_CONFIG',
          route: '/plugins/magicmirror-config',
          icon: 'settings'
        },
        {
          label: 'NAV.MAGICMIRROR_UPDATE',
          route: '/plugins/magicmirror-update',
          icon: 'system_update'
        },
        {
          label: 'NAV.DOCKER_UPDATE',
          route: '/plugins/docker-update',
          icon: 'cloud_upload'
        },
        {
          label: 'NAV.SYSTEM_UPDATE',
          route: '/plugins/system-update',
          icon: 'security_update'
        },
        {
          label: 'NAV.WLAN',
          route: '/plugins/wlan',
          icon: 'wifi'
        }
      ]
    }
  ];
}
