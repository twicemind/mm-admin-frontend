import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-docker-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ 'NAV.DOCKER_UPDATE' | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Docker Update Funktionalität wird hier implementiert.</p>
      </mat-card-content>
    </mat-card>
  `
})
export class DockerUpdateComponent {}
