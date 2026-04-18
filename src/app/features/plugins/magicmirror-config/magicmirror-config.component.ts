import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-magicmirror-config',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'NAV.MAGICMIRROR_CONFIG' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>MagicMirror Konfiguration wird hier implementiert.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class MagicmirrorConfigComponent {}
