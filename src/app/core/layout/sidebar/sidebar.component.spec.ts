import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation items', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  });

  it('should have dashboard item', () => {
    const dashboardItem = component.navItems.find(item => item.route === '/dashboard');
    expect(dashboardItem).toBeTruthy();
    expect(dashboardItem?.label).toBe('NAV.DASHBOARD');
  });

  it('should have plugins section with children', () => {
    const pluginsItem = component.navItems.find(item => item.label === 'NAV.PLUGINS');
    expect(pluginsItem).toBeTruthy();
    expect(pluginsItem?.children).toBeDefined();
    expect(pluginsItem?.children?.length).toBe(6);
  });

  it('should render navigation list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-nav-list')).toBeTruthy();
  });
});
