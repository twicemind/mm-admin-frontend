import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PluginsOverviewComponent } from './plugins-overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PluginsOverviewComponent', () => {
  let component: PluginsOverviewComponent;
  let fixture: ComponentFixture<PluginsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginsOverviewComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PluginsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 plugins', () => {
    expect(component.plugins.length).toBe(6);
  });

  it('should have plugins with required properties', () => {
    component.plugins.forEach(plugin => {
      expect(plugin.name).toBeDefined();
      expect(plugin.description).toBeDefined();
      expect(plugin.icon).toBeDefined();
      expect(plugin.route).toBeDefined();
      expect(plugin.color).toBeDefined();
    });
  });

  it('should render plugin cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');
    expect(cards.length).toBe(6);
  });

  it('should have modules plugin', () => {
    const modulesPlugin = component.plugins.find(p => p.route === '/plugins/modules');
    expect(modulesPlugin).toBeTruthy();
    expect(modulesPlugin?.name).toBe('NAV.MODULES');
  });

  it('should have wlan plugin', () => {
    const wlanPlugin = component.plugins.find(p => p.route === '/plugins/wlan');
    expect(wlanPlugin).toBeTruthy();
    expect(wlanPlugin?.name).toBe('NAV.WLAN');
  });
});
