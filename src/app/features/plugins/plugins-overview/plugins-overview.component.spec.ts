import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PluginsOverviewComponent } from './plugins-overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PluginsOverviewComponent', () => {
  let component: PluginsOverviewComponent;
  let fixture: ComponentFixture<PluginsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginsOverviewComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PluginsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize plugins array', () => {
    expect(component.plugins).toBeDefined();
    expect(Array.isArray(component.plugins)).toBe(true);
  });

  it('should have getPluginRoute method', () => {
    const mockPlugin = {
      name: 'test-plugin',
      displayName: 'Test Plugin',
      version: '1.0.0',
      description: 'Test',
      author: 'Test',
      icon: 'test',
      color: '#000',
      frontend: {
        route: '/plugins/test',
        menuLabel: 'Test',
        menuIcon: 'test'
      }
    };
    expect(component.getPluginRoute(mockPlugin)).toBe('/plugins/test');
  });
});
