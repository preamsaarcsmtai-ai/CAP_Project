import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {
 currentPage = 'home';
  collapsed = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  isCollapsed() {
    return this.collapsed;
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  doLogout() {
    console.log('Logging out...');
  }

filteredMenuItems() {
  return [
    { id: 'dashboard', title: 'Dashboard', icon: 'bi bi-house-door', path: 'dashboard' },
    { id: 'questionbank', title: 'Question Bank', icon: 'bi bi-question-circle', path: 'questionbank' },
    { id: 'users', title: 'Users', icon: 'bi bi-people', path: 'users' },
    { id: 'settings', title: 'Settings', icon: 'bi bi-gear', path: '/admin/settings' },
  ];
}

}
