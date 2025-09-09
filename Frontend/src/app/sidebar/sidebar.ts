import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
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
      { id: 'dashboard', title: 'Dashboard', icon: 'bi bi-house-door' },
      {id:'institutions',title:'Institutions', icon:'bi bi-mortarboard'},
      { id: 'users', title: 'Users', icon: 'bi-people' },
      { id: 'settings', title: 'Settings', icon: 'bi-gear' },
    ];
  }
}
