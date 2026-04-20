import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { PluginRegistryService, PluginMetadata } from '../../../core/services/plugin-registry.service';
import { PluginInstallDialogComponent } from '../../plugin-manager/plugin-install-dialog/plugin-install-dialog.component';

@Component({
  selector: 'app-plugins-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    TranslateModule
  ],
  templateUrl: './plugins-overview.component.html',
  styleUrls: ['./plugins-overview.component.scss']
})
export class PluginsOverviewComponent implements OnInit {
  plugins: PluginMetadata[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private pluginRegistry: PluginRegistryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPlugins();
  }

  loadPlugins() {
    this.loading = true;
    this.error = null;
    
    this.pluginRegistry.loadPlugins().subscribe({
      next: (response) => {
        if (response.success) {
          this.plugins = response.plugins;
        } else {
          this.error = 'Failed to load plugins';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading plugins:', err);
        this.error = 'Could not connect to backend. Make sure the backend is running on http://localhost:3000';
        this.loading = false;
      }
    });
  }

  getPluginRoute(plugin: PluginMetadata): string {
    return plugin.frontend?.route || `/plugins/${plugin.name}`;
  }

  startPlugin(plugin: PluginMetadata, event: Event) {
    event.stopPropagation();
    this.pluginRegistry.startPlugin(plugin.name).subscribe({
      next: () => {
        this.snackBar.open(`${plugin.displayName} gestartet`, 'OK', { duration: 2000 });
        this.loadPlugins();
      },
      error: (err) => {
        console.error('Error starting plugin:', err);
        this.snackBar.open(`Fehler beim Starten: ${err.message}`, 'OK', { duration: 3000 });
      }
    });
  }

  stopPlugin(plugin: PluginMetadata, event: Event) {
    event.stopPropagation();
    this.pluginRegistry.stopPlugin(plugin.name).subscribe({
      next: () => {
        this.snackBar.open(`${plugin.displayName} gestoppt`, 'OK', { duration: 2000 });
        this.loadPlugins();
      },
      error: (err) => {
        console.error('Error stopping plugin:', err);
        this.snackBar.open(`Fehler beim Stoppen: ${err.message}`, 'OK', { duration: 3000 });
      }
    });
  }

  openInstallDialog() {
    const dialogRef = this.dialog.open(PluginInstallDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'plugin-install-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.installPlugin(result.repository, result.release);
      }
    });
  }

  installPlugin(repository: string, release: string) {
    this.pluginRegistry.installFromGitHub(repository, release).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Plugin erfolgreich installiert', 'OK', { duration: 3000 });
          this.loadPlugins();
        } else {
          this.snackBar.open(`Fehler: ${response.message}`, 'OK', { duration: 5000 });
        }
      },
      error: (err) => {
        this.snackBar.open(`Fehler beim Installieren: ${err.message}`, 'OK', { duration: 5000 });
      }
    });
  }

  updatePlugin(plugin: PluginMetadata, event: Event) {
    event.stopPropagation();
    
    if (plugin.integrated) {
      this.snackBar.open('Integrierte Plugins können nicht einzeln aktualisiert werden', 'OK', { duration: 3000 });
      return;
    }
    
    this.snackBar.open('Plugin-Update wird noch nicht unterstützt', 'OK', { duration: 3000 });
    // TODO: Implement update logic
  }

  removePlugin(plugin: PluginMetadata, event: Event) {
    event.stopPropagation();
    
    if (plugin.integrated) {
      this.snackBar.open('Integrierte Plugins können nicht entfernt werden', 'OK', { duration: 3000 });
      return;
    }
    
    if (!confirm(`Möchten Sie das Plugin "${plugin.displayName}" wirklich entfernen?`)) {
      return;
    }

    this.pluginRegistry.uninstallPlugin(plugin.name).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Plugin entfernt', 'OK', { duration: 2000 });
          this.loadPlugins();
        } else {
          this.snackBar.open(`Fehler: ${response.message}`, 'OK', { duration: 3000 });
        }
      },
      error: (err) => {
        this.snackBar.open(`Fehler beim Entfernen: ${err.message}`, 'OK', { duration: 3000 });
      }
    });
  }
}
