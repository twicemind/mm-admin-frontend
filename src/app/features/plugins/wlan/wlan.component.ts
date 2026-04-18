import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wlan',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'NAV.WLAN' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>WLAN Verwaltung wird hier implementiert.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class WlanComponent {}
