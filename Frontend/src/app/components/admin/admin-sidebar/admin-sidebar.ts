import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css']
})
export class AdminSidebar {
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
    // TODO: replace with actual logout logic
  }

  get filteredMenuItems() {
    return [
      { id: 'dashboard', title: 'Dashboard', icon: 'bi bi-house-door', path: '/admin/dashboard' },
      { id: 'questionbank', title: 'Question Bank', icon: 'bi bi-question-circle', path: '/admin/questionbank' },
      { id: 'users', title: 'Users', icon: 'bi bi-people', path: '/admin/users' },
      { id: 'settings', title: 'Settings', icon: 'bi bi-gear', path: '/admin/settings' },
    ];
  }
}
