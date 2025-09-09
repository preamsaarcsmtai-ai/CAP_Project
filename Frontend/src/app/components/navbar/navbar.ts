import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg shadow-sm sticky-top stylish-navbar">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <div class="brand-icon me-2">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <span class="fw-bold fs-5">Student Dashboard</span>
        </a>

        <!-- Toggler for mobile -->
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" *ngFor="let link of navLinks">
              <a class="nav-link stylish-link"
                 [class.active]="currentPage === link.page"
                 (click)="onPageChange(link.page)"
                 role="button">
                <i class="{{link.icon}} me-1"></i>{{link.label}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    /* Navbar Styling */
    .stylish-navbar {
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      backdrop-filter: blur(10px);
      border-radius: 0 0 12px 12px;
      padding: 0.8rem 1rem;
    }

    /* Brand Icon Circle */
    .brand-icon {
      background: #fff;
      color: #2575fc;
      border-radius: 50%;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
    }
    .brand-icon:hover {
      transform: rotate(10deg) scale(1.1);
    }

    /* Links */
    .stylish-link {
      cursor: pointer;
      font-weight: 500;
      position: relative;
      transition: color 0.3s ease;
    }
    .stylish-link::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #ffeb3b;
      transition: width 0.3s ease;
    }
    .stylish-link:hover::after {
      width: 100%;
    }
    .stylish-link.active {
      color: #ffeb3b !important;
      font-weight: 600;
    }

    /* Custom Toggler */
    .custom-toggler {
      border: none;
      outline: none;
    }
    .custom-toggler:focus {
      box-shadow: none;
    }
  `]
})
export class NavbarComponent {
  @Input() currentPage: string = 'insights';
  @Output() pageChanged = new EventEmitter<string>();

  navLinks = [
    { page: 'insights', label: 'Insights', icon: 'fas fa-chart-line' },
    { page: 'tests', label: 'Tests', icon: 'fas fa-clipboard-list' },
    { page: 'results', label: 'Results', icon: 'fas fa-chart-bar' }
  ];

  onPageChange(page: string): void {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
