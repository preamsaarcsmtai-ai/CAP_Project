import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <i class="fas fa-graduation-cap me-2"></i>
          <span>Student Dashboard</span>
        </a>

        <!-- Toggler for mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link"
                 [class.active]="currentPage === 'insights'"
                 (click)="onPageChange('insights')"
                 role="button">
                <i class="fas fa-chart-line me-1"></i>Insights
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 [class.active]="currentPage === 'tests'"
                 (click)="onPageChange('tests')"
                 role="button">
                <i class="fas fa-clipboard-list me-1"></i>Tests
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 [class.active]="currentPage === 'results'"
                 (click)="onPageChange('results')"
                 role="button">
                <i class="fas fa-chart-bar me-1"></i>Results
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-link:hover {
      color: #ffeb3b;
    }
    .nav-link.active {
      font-weight: 600;
      border-bottom: 2px solid #fff;
    }
  `]
})
export class NavbarComponent {
  @Input() currentPage: string = 'insights';
  @Output() pageChanged = new EventEmitter<string>();

  onPageChange(page: string): void {
    this.currentPage = page; // Update active link
    this.pageChanged.emit(page);
  }
}
