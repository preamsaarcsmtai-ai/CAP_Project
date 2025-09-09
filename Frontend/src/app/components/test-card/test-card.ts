import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from '../../models/student.model';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">{{test.title}}</h6>
        <span class="badge" [ngClass]="getStatusClass(test.status)">{{test.status}}</span>
      </div>
      <div class="card-body">
        <p class="text-muted small">{{test.description}}</p>
        <div class="row text-center mb-3">
          <div class="col-4">
            <small class="text-muted d-block">Estimated Time</small>
            <strong>{{test.duration}} min</strong>
          </div>
          <div class="col-4">
            <small class="text-muted d-block">Questions</small>
            <strong>{{test.questions}}</strong>
          </div>
          <div class="col-4">
            <small class="text-muted d-block">Skill Level</small>
            <span class="badge" [ngClass]="getDifficultyClass(test.difficulty)">{{test.difficulty}}</span>
          </div>
        </div>
        <button class="btn w-100" [ngClass]="getButtonClass(test.status)" 
                [disabled]="test.status === 'Completed'">
          {{getButtonText(test.status)}}
        </button>
      </div>
    </div>
  `
})
export class TestCard {
  @Input() test!: Test;

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'In Progress': return 'bg-warning text-dark';
      case 'Available': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return 'bg-success';
      case 'Medium': return 'bg-warning text-dark';
      case 'Hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getButtonClass(status: string): string {
    switch (status) {
      case 'Completed': return 'btn-secondary';
      case 'In Progress': return 'btn-warning';
      case 'Available': return 'btn-primary';
      default: return 'btn-outline-primary';
    }
  }

  getButtonText(status: string): string {
    switch (status) {
      case 'Completed': return 'Assessment Completed';
      case 'In Progress': return 'Continue Assessment';
      case 'Available': return 'Start Assessment';
      default: return 'Start';
    }
  }
}
