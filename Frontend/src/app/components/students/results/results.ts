import { Component, Input, OnInit } from '@angular/core';
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
export class Results implements OnInit {
  @Input() results!: TestResult;

  score!: number;
  percentile!: number;

  testDetails: Record<string, any> = {
    psychometric: { name: 'Psychometric Assessment', color: 'primary', maxScore: 100, passingScore: 70 },
    aptitude: { name: 'Aptitude Test', color: 'success', maxScore: 100, passingScore: 75 },
    technical: { name: 'Technical MCQ', color: 'warning', maxScore: 100, passingScore: 80 }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Compute these once on init to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.score = this.computeScore();
    this.percentile = this.computePercentile();
  }

  /** Safely return test detail */
  getTestDetail() {
    return this.results ? this.testDetails[this.results.testId] : null;
  }

  private computeScore(): number {
    return Math.floor(Math.random() * 30) + 70; // mock 70-100
  }

  private computePercentile(): number {
    return Math.floor(Math.random() * 40) + 60; // mock 60-100
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  goToDashboard() {
    this.router.navigate(['/students']);
  }

  // Utility for template to safely access Date
  now(): number {
    return Date.now();
  }

  // Utility for template to safely access String
  charFromCode(code: number): string {
    return String.fromCharCode(code);
  }
}
