import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../../components/stats-card/stats-card';
import { StudentStats } from '../../models/student.model';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, StatsCardComponent],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <h2><i class="fas fa-chart-line me-2"></i>Student Insights</h2>
          <p class="text-muted">Overview of your academic performance and progress</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row mb-4">
        <div class="col-md-3 mb-3">
          <app-stats-card 
            title="Total Tests" 
            [value]="stats.totalTests" 
            icon="fa-clipboard-list" 
            color="primary">
          </app-stats-card>
        </div>
        <div class="col-md-3 mb-3">
          <app-stats-card 
            title="Completed" 
            [value]="stats.completedTests" 
            icon="fa-check-circle" 
            color="success">
          </app-stats-card>
        </div>
        <div class="col-md-3 mb-3">
          <app-stats-card 
            title="Avg Score" 
            [value]="stats.averageScore + '%'" 
            icon="fa-percentage" 
            color="info">
          </app-stats-card>
        </div>
        <div class="col-md-3 mb-3">
          <app-stats-card 
            title="Pending" 
            [value]="stats.pendingTests" 
            icon="fa-clock" 
            color="warning">
          </app-stats-card>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5><i class="fas fa-chart-pie me-2"></i>Performance by Subject</h5>
            </div>
            <div class="card-body">
              <div class="mb-3" *ngFor="let subject of subjectPerformance">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span>{{subject.name}}</span>
                  <span>{{subject.percentage}}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar" [ngClass]="subject.class" [style.width.%]="subject.percentage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5><i class="fas fa-trophy me-2"></i>Recent Achievements</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-3" *ngFor="let achievement of achievements">
                <div class="rounded-circle p-2 me-3" [ngClass]="achievement.bgClass">
                  <i [class]="'fas ' + achievement.icon + ' text-white'"></i>
                </div>
                <div>
                  <h6 class="mb-0">{{achievement.title}}</h6>
                  <small class="text-muted">{{achievement.description}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Insights implements OnInit {
  stats: StudentStats = {
    totalTests: 0,
    completedTests: 0,
    averageScore: 0,
    pendingTests: 0
  };

  subjectPerformance = [
    { name: 'Mathematics', percentage: 85, class: 'bg-success' },
    { name: 'Science', percentage: 78, class: 'bg-info' },
    { name: 'English', percentage: 92, class: 'bg-primary' },
    { name: 'History', percentage: 75, class: 'bg-warning' }
  ];

  achievements = [
    {
      title: 'Perfect Score!',
      description: 'Scored 100% in English Literature',
      icon: 'fa-medal',
      bgClass: 'bg-warning'
    },
    {
      title: 'Speed Runner',
      description: 'Completed test in record time',
      icon: 'fa-bolt',
      bgClass: 'bg-success'
    },
    {
      title: 'Consistency',
      description: '5 tests completed this week',
      icon: 'fa-star',
      bgClass: 'bg-primary'
    }
  ];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.stats = this.studentService.getStudentStats();
  }
}




