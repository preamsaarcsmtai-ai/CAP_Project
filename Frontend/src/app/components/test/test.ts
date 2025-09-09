// src/app/pages/tests/tests.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCard } from '../test-card/test-card';
import { Test } from '../../models/student.model';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, TestCard],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <h2><i class="fas fa-briefcase me-2"></i>Career Assessment Tests</h2>
          <p class="text-muted">Evaluate your skills and interests to discover the best career path for you.</p>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="row mb-4">
        <div class="col-12">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link" 
                 [class.active]="activeFilter === 'all'"
                 (click)="setFilter('all')"
                 style="cursor: pointer;">All Assessments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 [class.active]="activeFilter === 'available'"
                 (click)="setFilter('available')"
                 style="cursor: pointer;">Not Started</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 [class.active]="activeFilter === 'in-progress'"
                 (click)="setFilter('in-progress')"
                 style="cursor: pointer;">In Progress</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 [class.active]="activeFilter === 'completed'"
                 (click)="setFilter('completed')"
                 style="cursor: pointer;">Completed</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tests Grid -->
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4" *ngFor="let test of filteredTests">
          <app-test-card [test]="test"></app-test-card>
        </div>
      </div>

      <div *ngIf="filteredTests.length === 0" class="text-center py-5">
        <i class="fas fa-briefcase fa-3x text-muted mb-3"></i>
        <h4 class="text-muted">No assessments found</h4>
        <p class="text-muted">There are no career assessments matching your current filter.</p>
      </div>
    </div>
  `
})
export class TestsComponent implements OnInit {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  activeFilter: string = 'all';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getTests().subscribe(tests => {
      this.tests = tests;
      this.filterTests();
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filterTests();
  }

  private filterTests(): void {
    switch (this.activeFilter) {
      case 'available':
        this.filteredTests = this.tests.filter(t => t.status === 'Available');
        break;
      case 'in-progress':
        this.filteredTests = this.tests.filter(t => t.status === 'In Progress');
        break;
      case 'completed':
        this.filteredTests = this.tests.filter(t => t.status === 'Completed');
        break;
      default:
        this.filteredTests = [...this.tests];
    }
  }
}
