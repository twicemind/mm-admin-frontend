import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  route?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards: DashboardCard[] = [
    {
      title: 'DASHBOARD.SYSTEM_STATUS',
      value: 'Online',
      icon: 'check_circle',
      color: '#4caf50'
    },
    {
      title: 'NAV.MODULES',
      value: 0,
      icon: 'view_module',
      color: '#2196f3',
      route: '/plugins/modules'
    },
    {
      title: 'NAV.PLUGINS',
      value: 6,
      icon: 'extension',
      color: '#ff9800',
      route: '/plugins'
    },
    {
      title: 'DASHBOARD.QUICK_ACTIONS',
      value: 4,
      icon: 'flash_on',
      color: '#9c27b0'
    }
  ];

  cols = 4;

  ngOnInit() {
    this.updateCols(window.innerWidth);
    window.addEventListener('resize', () => {
      this.updateCols(window.innerWidth);
    });
  }

  private updateCols(width: number) {
    if (width < 600) {
      this.cols = 1;
    } else if (width < 960) {
      this.cols = 2;
    } else if (width < 1280) {
      this.cols = 3;
    } else {
      this.cols = 4;
    }
  }
}
