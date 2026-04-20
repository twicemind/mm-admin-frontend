import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface PluginMetadata {
  name: string;
  displayName: string;
  version: string;
  description: string;
  author: string;
  icon: string;
  color: string;
  integrated?: boolean;
  frontend?: {
    route: string;
    menuLabel: string;
    menuIcon: string;
  };
  repository?: {
    type: string;
    url: string;
  };
  status?: {
    running: boolean;
    uptime?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PluginRegistryService {
  private apiUrl = 'http://localhost:3000/api';
  private pluginsSubject = new BehaviorSubject<PluginMetadata[]>([]);
  
  public plugins$ = this.pluginsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Load all available plugins from backend
   */
  loadPlugins(): Observable<{ success: boolean; plugins: PluginMetadata[] }> {
    return this.http.get<{ success: boolean; plugins: PluginMetadata[] }>(`${this.apiUrl}/plugins`)
      .pipe(
        tap(response => {
          if (response.success) {
            this.pluginsSubject.next(response.plugins);
          }
        })
      );
  }

  /**
   * Get a specific plugin by name
   */
  getPlugin(name: string): Observable<{ success: boolean; plugin: PluginMetadata }> {
    return this.http.get<{ success: boolean; plugin: PluginMetadata }>(`${this.apiUrl}/plugins/${name}`);
  }

  /**
   * Get all plugins (current value)
   */
  getAllPlugins(): PluginMetadata[] {
    return this.pluginsSubject.value;
  }

  /**
   * Get plugin by name (current value)
   */
  getPluginByName(name: string): PluginMetadata | undefined {
    return this.pluginsSubject.value.find(p => p.name === name);
  }

  /**
   * Start a plugin
   */
  startPlugin(name: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/plugins/${name}/start`, {})
      .pipe(
        tap(() => this.loadPlugins().subscribe())
      );
  }

  /**
   * Stop a plugin
   */
  stopPlugin(name: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/plugins/${name}/stop`, {})
      .pipe(
        tap(() => this.loadPlugins().subscribe())
      );
  }

  /**
   * Get plugin logs
   */
  getPluginLogs(name: string, limit: number = 100): Observable<{ success: boolean; logs: any[] }> {
    return this.http.get<{ success: boolean; logs: any[] }>(`${this.apiUrl}/plugins/${name}/logs?limit=${limit}`);
  }

  /**
   * Install plugin from GitHub
   */
  installFromGitHub(repository: string, release: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/plugins/install`, {
      repository,
      release
    }).pipe(
      tap(() => this.loadPlugins().subscribe())
    );
  }

  /**
   * Uninstall a plugin
   */
  uninstallPlugin(name: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/plugins/${name}`)
      .pipe(
        tap(() => this.loadPlugins().subscribe())
      );
  }

  /**
   * Reload plugins from backend
   */
  reload(): void {
    this.loadPlugins().subscribe();
  }
}
