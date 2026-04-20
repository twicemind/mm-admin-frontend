import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plugin-install-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Plugin von GitHub installieren</h2>
    <mat-dialog-content>
      <p>Installiere ein Plugin direkt aus einem GitHub-Repository</p>
      
      <mat-form-field class="full-width">
        <mat-label>GitHub Repository URL</mat-label>
        <input matInput [(ngModel)]="repository" placeholder="https://github.com/user/plugin">
      </mat-form-field>
      
      <mat-form-field class="full-width">
        <mat-label>Release Tag (optional)</mat-label>
        <input matInput [(ngModel)]="release" placeholder="v1.0.0 oder latest">
      </mat-form-field>
      
      <p class="hint">
        Das Repository muss eine <code>plugin.json</code> im Root-Verzeichnis enthalten.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Abbrechen</button>
      <button mat-raised-button color="primary" (click)="install()" [disabled]="!repository">
        Installieren
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      min-width: 300px;
    }
    
    mat-dialog-content {
      padding: 20px 24px;
      max-height: 60vh;
      overflow-y: auto;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .hint {
      font-size: 12px;
      color: #666;
      margin: 16px 0 0 0;
      
      code {
        background: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
      }
    }
    
    @media (max-width: 600px) {
      mat-dialog-content {
        padding: 16px;
      }
      
      .full-width {
        margin-bottom: 12px;
      }
    }
  `]
})
export class PluginInstallDialogComponent {
  repository = '';
  release = 'latest';

  constructor(private dialogRef: MatDialogRef<PluginInstallDialogComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  install() {
    this.dialogRef.close({
      repository: this.repository,
      release: this.release
    });
  }
}
