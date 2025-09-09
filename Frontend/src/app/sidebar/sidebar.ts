import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
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
      { id: 'dashboard', title: 'Dashboard', icon: 'bi bi-house-door',path:'dashboard' },
      {id:'institutions',title:'Institutions', icon:'bi bi-mortarboard',path:'institution'},
      { id: 'users', title: 'Users', icon: 'bi-people',path:'users' },
      { id: 'settings', title: 'Settings', icon: 'bi-gear' },
    ];
  }
}
