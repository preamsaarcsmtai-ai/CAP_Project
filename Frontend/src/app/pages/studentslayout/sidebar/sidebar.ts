import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  collapsed = false;
  mobileMenuOpen = false;
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
  }

  mainNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/', icon: 'bi-house' },
    { title: 'Assessments', url: '/assessments', icon: 'bi-journal-bookmark' },
    { title: 'Results', url: '/results', icon: 'bi-trophy' },
    { title: 'Analytics', url: '/analytics', icon: 'bi-bar-chart' },
    { title: 'Schedule', url: '/schedule', icon: 'bi-calendar' },
  ];

  toggleSidebar() {
    if (this.isMobile) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
  }

  private checkScreen() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) this.mobileMenuOpen = false;
    }
  }
}
