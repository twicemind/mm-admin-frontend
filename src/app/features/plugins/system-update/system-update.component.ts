import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-system-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'NAV.SYSTEM_UPDATE' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>System Update Funktionalität wird hier implementiert.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class SystemUpdateComponent {}
