import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface LogEntry {
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  source: string;
  message: string;
  plugin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private apiUrl = 'http://localhost:3000/api';
  private frontendLogs: LogEntry[] = [];
  private logsSubject = new BehaviorSubject<LogEntry[]>([]);
  
  public logs$ = this.logsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Intercept console methods
    this.interceptConsole();
  }

  /**
   * Intercept console methods to capture frontend logs
   */
  private interceptConsole() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      this.addLog('INFO', 'Frontend', args.join(' '));
      originalLog.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.addLog('WARN', 'Frontend', args.join(' '));
      originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.addLog('ERROR', 'Frontend', args.join(' '));
      originalError.apply(console, args);
    };
  }

  /**
   * Add a log entry
   */
  private addLog(level: LogEntry['level'], source: string, message: string, plugin?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      source,
      message,
      plugin
    };

    this.frontendLogs.unshift(entry);
    
    // Keep only last 1000 logs
    if (this.frontendLogs.length > 1000) {
      this.frontendLogs = this.frontendLogs.slice(0, 1000);
    }

    this.logsSubject.next(this.frontendLogs);
  }

  /**
   * Get frontend logs
   */
  getFrontendLogs(): LogEntry[] {
    return this.frontendLogs;
  }

  /**
   * Get backend logs
   */
  getBackendLogs(): Observable<{ success: boolean; logs: LogEntry[] }> {
    return this.http.get<{ success: boolean; logs: LogEntry[] }>(`${this.apiUrl}/logs`);
  }

  /**
   * Get plugin logs
   */
  getPluginLogs(pluginName: string): Observable<{ success: boolean; logs: any[] }> {
    return this.http.get<{ success: boolean; logs: any[] }>(`${this.apiUrl}/plugins/${pluginName}/logs`);
  }

  /**
   * Clear frontend logs
   */
  clearFrontendLogs() {
    this.frontendLogs = [];
    this.logsSubject.next(this.frontendLogs);
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.frontendLogs, null, 2);
  }

  /**
   * Manual log
   */
  log(message: string, source: string = 'App', plugin?: string) {
    this.addLog('INFO', source, message, plugin);
  }

  warn(message: string, source: string = 'App', plugin?: string) {
    this.addLog('WARN', source, message, plugin);
  }

  error(message: string, source: string = 'App', plugin?: string) {
    this.addLog('ERROR', source, message, plugin);
  }
}
