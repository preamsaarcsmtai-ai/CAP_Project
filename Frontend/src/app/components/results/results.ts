import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TestResult {
  testId: string;
  answers: Record<number, string>;
  timeSpent: number;
  warnings: string[];
  completedAt: string;
}

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class Results {
  @Input() results!: TestResult;

  constructor(private router: Router) {}

  testDetails: any = {
    psychometric: {
      name: 'Psychometric Assessment',
      color: 'primary',
      maxScore: 100,
      passingScore: 70
    },
    aptitude: {
      name: 'Aptitude Test',
      color: 'success',
      maxScore: 100,
      passingScore: 75
    },
    technical: {
      name: 'Technical MCQ',
      color: 'warning',
      maxScore: 100,
      passingScore: 80
    }
  };

  /** Safely return test detail */
  getTestDetail() {
    return this.results ? this.testDetails[this.results.testId] : null;
  }

  getScore(): number {
    return Math.floor(Math.random() * 30) + 70; // mock 70-100
  }

  getPercentile(): number {
    return Math.floor(Math.random() * 40) + 60; // mock 60-100
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
