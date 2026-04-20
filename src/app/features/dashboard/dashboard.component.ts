import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PluginRegistryService, PluginMetadata } from '../../core/services/plugin-registry.service';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  route?: string;
}

interface QuickAction {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Removed cards array - only online status shown inline in template

  quickActions: QuickAction[] = [
    {
      label: 'Plugin installieren',
      icon: 'add_circle',
      route: '/plugins'
    },
    {
      label: 'System-Logs anzeigen',
      icon: 'description',
      route: '/logs'
    },
    {
      label: 'System Monitor öffnen',
      icon: 'monitoring',
      route: '/plugins/system-monitor'
    },
    {
      label: 'Alle Plugins anzeigen',
      icon: 'extension',
      route: '/plugins'
    }
  ];

  plugins: PluginMetadata[] = [];
  runningPlugins: PluginMetadata[] = [];

  // Update management
  adminVersion = '0.4.1';
  latestVersion = '';
  updateAvailable = false;
  updateChangelog = '';
  checkingUpdates = false;
  installingUpdate = false;

  constructor(
    private pluginRegistry: PluginRegistryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Load plugins
    this.loadPlugins();
    
    // Check for admin updates on init
    this.checkForUpdates();
  }

  loadPlugins() {
    this.pluginRegistry.loadPlugins().subscribe({
      next: (response) => {
        if (response.success) {
          this.plugins = response.plugins;
          this.runningPlugins = this.plugins.filter(p => p.status?.running);
        }
      },
      error: (err) => console.error('Error loading plugins:', err)
    });
  }

  executeQuickAction(action: QuickAction) {
    if (action.route) {
      this.router.navigate([action.route]);
    } else if (action.action) {
      action.action();
    }
  }

  checkForUpdates() {
    this.checkingUpdates = true;
    this.http.get<any>('http://localhost:3000/api/admin/version').subscribe({
      next: (response) => {
        if (response.success) {
          this.latestVersion = response.latestVersion;
          this.updateAvailable = response.updateAvailable;
          this.updateChangelog = response.changelog || '';
          
          if (this.updateAvailable) {
            this.snackBar.open(`Update verfügbar: v${this.latestVersion}`, 'Anzeigen', { duration: 5000 });
          }
        }
        this.checkingUpdates = false;
      },
      error: (err) => {
        console.error('Error checking for updates:', err);
        this.checkingUpdates = false;
      }
    });
  }

  installUpdate() {
    if (!confirm('Möchten Sie das Update wirklich installieren? Das System wird dabei neu gestartet.')) {
      return;
    }

    this.installingUpdate = true;
    this.http.post<any>('http://localhost:3000/api/admin/update', {}).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Update wird installiert...', 'OK', { duration: 3000 });
          // Reload page after update
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.snackBar.open(`Fehler: ${response.message}`, 'OK', { duration: 5000 });
          this.installingUpdate = false;
        }
      },
      error: (err) => {
        this.snackBar.open(`Fehler beim Update: ${err.message}`, 'OK', { duration: 5000 });
        this.installingUpdate = false;
      }
    });
  }
}
