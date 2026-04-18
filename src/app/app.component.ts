import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mm-admin-frontend';

  constructor(private translate: TranslateService) {
    // Set default and available languages
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    
    // Get browser language or use default
    const browserLang = this.translate.getBrowserLang();
    const langToUse = browserLang?.match(/de|en/) ? browserLang : 'de';
    this.translate.use(langToUse);
  }

  ngOnInit() {
    // Component initialization
  }
}
