import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students-home.html',
})
export class Students {
  stats = {
    phases: 3,
    questions: 120,
    minutes: 250,
    average: 78,
  };

  recentResults = [
    { test: 'Psychometric Test', score: 85, date: 'Sep 10', status: 'completed' },
    { test: 'Aptitude Test', score: 70, date: 'Sep 12', status: 'completed' },
    { test: 'Technical Test', score: 60, date: 'Sep 14', status: 'pending' },
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'bi-check-circle text-emerald-500';
      case 'pending':
        return 'bi-hourglass-split text-orange-500';
      case 'failed':
        return 'bi-x-circle text-red-500';
      default:
        return 'bi-dot';
    }
  }
}
