import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface SystemData {
  system?: any;
  os?: any;
  time?: any;
  cpu: any;
  memory: any;
  disk: any[];
  network: any[];
}

@Component({
  selector: 'app-system-monitor',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    TranslateModule
  ],
  templateUrl: './system-monitor.component.html',
  styleUrls: ['./system-monitor.component.scss']
})
export class SystemMonitorComponent implements OnInit, OnDestroy {
  private apiUrl = 'http://localhost:3000/api/plugins/system-monitor';
  private refreshSubscription?: Subscription;
  
  systemData: SystemData | null = null;
  loading = true;
  error: string | null = null;

  cpuUsage = 0;
  memoryUsage = 0;
  memoryUsed = 0;
  memoryTotal = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSystemData();
    
    // Auto-refresh every 5 seconds
    this.refreshSubscription = interval(5000)
      .pipe(switchMap(() => this.http.get<any>(this.apiUrl)))
      .subscribe({
        next: (response) => this.updateSystemData(response),
        error: (err) => console.error('Error refreshing data:', err)
      });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadSystemData() {
    this.loading = true;
    this.error = null;

    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.updateSystemData(response);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading system data:', err);
        this.error = 'Could not connect to backend';
        this.loading = false;
      }
    });
  }

  updateSystemData(response: any) {
    if (response.success) {
      this.systemData = response.data;
      
      // Calculate CPU usage
      if (this.systemData?.cpu?.currentLoad) {
        this.cpuUsage = Math.round(this.systemData.cpu.currentLoad);
      }
      
      // Calculate Memory usage
      if (this.systemData?.memory) {
        const mem = this.systemData.memory;
        this.memoryUsed = Math.round(mem.used / (1024 * 1024 * 1024) * 10) / 10; // GB
        this.memoryTotal = Math.round(mem.total / (1024 * 1024 * 1024) * 10) / 10; // GB
        this.memoryUsage = Math.round((mem.used / mem.total) * 100);
      }
    }
  }

  getDiskUsage(disk: any): number {
    if (!disk) return 0;
    return Math.round((disk.used / disk.size) * 100);
  }

  formatBytes(bytes: number): string {
    if (!bytes) return '0 GB';
    const gb = bytes / (1024 * 1024 * 1024);
    return `${Math.round(gb * 10) / 10} GB`;
  }

  getStatusColor(percentage: number): string {
    if (percentage < 50) return 'primary';
    if (percentage < 75) return 'accent';
    return 'warn';
  }

  formatUptime(seconds: number): string {
    if (!seconds) return 'N/A';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    
    return parts.length > 0 ? parts.join(' ') : '< 1m';
  }
}
