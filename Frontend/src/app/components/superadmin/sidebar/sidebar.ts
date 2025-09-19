import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  currentPage = 'dashboard';
  collapsed = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  doLogout() {
    console.log('Logging out...');
    // TODO: implement logout logic
  }

  get filteredMenuItems() {
    return [
      { id: 'dashboard', title: 'Dashboard', icon: 'bi bi-house-door', path: '/dashboard' },
      { id: 'institutions', title: 'Institutions', icon: 'bi bi-mortarboard', path: '/institution' },
      { id: 'users', title: 'Users', icon: 'bi bi-people', path: '/users' },
      { id: 'settings', title: 'Settings', icon: 'bi bi-gear', path: '/settings' }
    ];
  }
}
