import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PluginRegistryService } from '../../services/plugin-registry.service';

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
export class SidebarComponent implements OnInit {
  isOpen = false;
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
      children: []
    }
  ];

  constructor(private pluginRegistry: PluginRegistryService) {}

  ngOnInit() {
    // Load plugins and populate sidebar
    this.pluginRegistry.plugins$.subscribe(plugins => {
      const pluginsNavItem = this.navItems.find(item => item.route === '/plugins');
      if (pluginsNavItem) {
        pluginsNavItem.children = plugins.map(plugin => ({
          label: plugin.displayName,
          route: plugin.frontend?.route || `/plugins/${plugin.name}`,
          icon: plugin.icon || 'extension'
        }));
      }
    });

    // Initial load
    this.pluginRegistry.loadPlugins().subscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }
}
