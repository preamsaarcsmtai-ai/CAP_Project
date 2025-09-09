
// src/app/pages/results/results.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Result } from '../../models/student.model';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <h2><i class="fas fa-chart-bar me-2"></i>Test Results</h2>
          <p class="text-muted">Review your performance and track your improvement over time</p>
        </div>
      </div>

      <!-- Results Table -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Recent Test Results</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Test Name</th>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Date Taken</th>
                      <th>Time Taken</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let result of results">
                      <td>
                        <strong>{{result.testTitle}}</strong>
                      </td>
                      <td>
                        <span class="badge bg-secondary">{{result.subject}}</span>
                      </td>
                      <td>{{result.score}}/{{result.totalQuestions}}</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="progress me-2" style="width: 60px; height: 8px;">
                            <div class="progress-bar" 
                                 [ngClass]="getPercentageClass(result.percentage)"
                                 [style.width.%]="result.percentage"></div>
                          </div>
                          <span>{{result.percentage}}%</span>
                        </div>
                      </td>
                      <td>
                        <span class="badge" [ngClass]="getGradeClass(result.grade)">{{result.grade}}</span>
                      </td>
                      <td>{{formatDate(result.dateTaken)}}</td>
                      <td>{{result.timeTaken}} min</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary">
                          <i class="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Summary -->
      <div class="row mt-4">
        <div class="col-md-4 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h3 class="text-primary">{{getAveragePercentage()}}%</h3>
              <p class="text-muted mb-0">Average Score</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h3 class="text-success">{{getHighestScore()}}%</h3>
              <p class="text-muted mb-0">Highest Score</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h3 class="text-info">{{results.length}}</h3>
              <p class="text-muted mb-0">Tests Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Results implements OnInit {
  results: Result[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getResults().subscribe(results => {
      this.results = results;
    });
  }

  getPercentageClass(percentage: number): string {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 80) return 'bg-info';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-danger';
  }

  getGradeClass(grade: string): string {
    if (grade.startsWith('A')) return 'bg-success';
    if (grade.startsWith('B')) return 'bg-info';
    if (grade.startsWith('C')) return 'bg-warning';
    return 'bg-danger';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getAveragePercentage(): number {
    if (this.results.length === 0) return 0;
    return Math.round(this.results.reduce((sum, r) => sum + r.percentage, 0) / this.results.length);
  }

  getHighestScore(): number {
    if (this.results.length === 0) return 0;
    return Math.max(...this.results.map(r => r.percentage));
  }
}