import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { PluginRegistryService, PluginMetadata } from '../../core/services/plugin-registry.service';
import { PluginInstallDialogComponent } from './plugin-install-dialog/plugin-install-dialog.component';

@Component({
  selector: 'app-plugin-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule
  ],
  templateUrl: './plugin-manager.component.html',
  styleUrls: ['./plugin-manager.component.scss']
})
export class PluginManagerComponent implements OnInit {
  plugins: PluginMetadata[] = [];
  loading = false;

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
    this.pluginRegistry.loadPlugins().subscribe({
      next: (response) => {
        if (response.success) {
          this.plugins = response.plugins;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading plugins:', err);
        this.loading = false;
      }
    });
  }

  openInstallDialog() {
    const dialogRef = this.dialog.open(PluginInstallDialogComponent, {
      width: '600px'
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

  uninstallPlugin(plugin: PluginMetadata) {
    if (!confirm(`Möchten Sie das Plugin "${plugin.displayName}" wirklich deinstallieren?`)) {
      return;
    }

    this.pluginRegistry.uninstallPlugin(plugin.name).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Plugin erfolgreich deinstalliert', 'OK', { duration: 3000 });
          this.loadPlugins();
        } else {
          this.snackBar.open(`Fehler: ${response.message}`, 'OK', { duration: 5000 });
        }
      },
      error: (err) => {
        this.snackBar.open(`Fehler beim Deinstallieren: ${err.message}`, 'OK', { duration: 5000 });
      }
    });
  }

  updatePlugin(plugin: PluginMetadata) {
    this.snackBar.open('Plugin-Update wird noch nicht unterstützt', 'OK', { duration: 3000 });
    // TODO: Implement update logic
  }
}
