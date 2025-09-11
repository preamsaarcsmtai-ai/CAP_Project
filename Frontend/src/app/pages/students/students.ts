import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface TestPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  questions: number;
  icon: string;
  color: string;
  status: 'not_started' | 'in_progress' | 'completed';
  difficulty: string;
}

interface RecentResult {
  test: string;
  score: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {
  selectedPhase: string | null = null;

  constructor(private router: Router) { }

  testPhases: TestPhase[] = [
    {
      id: "psychometric",
      name: "Psychometric Assessment",
      description: "Personality and behavioral analysis",
      duration: "30 minutes",
      questions: 50,
      icon: "bi bi-brain",
      color: "primary",
      status: "not_started",
      difficulty: "Medium"
    },
    {
      id: "aptitude",
      name: "Aptitude Test",
      description: "Logical reasoning and problem solving",
      duration: "45 minutes",
      questions: 40,
      icon: "bi bi-calculator",
      color: "warning",
      status: "not_started",
      difficulty: "Hard"
    },
    {
      id: "technical",
      name: "Technical MCQ",
      description: "Domain-specific technical knowledge",
      duration: "60 minutes",
      questions: 30,
      icon: "bi bi-code-slash",
      color: "danger",
      status: "not_started",
      difficulty: "Expert"
    }
  ];

  recentResults: RecentResult[] = [
    { test: "Practice Aptitude", score: 85, date: "2 days ago", status: "completed" },
    { test: "Mock Technical", score: 92, date: "1 week ago", status: "completed" },
    { test: "Psychometric Preview", score: 78, date: "2 weeks ago", status: "completed" }
  ];

  getStatusIcon(status: string) {
    switch (status) {
      case "completed":
        return "bi bi-check-circle text-success";
      case "in_progress":
        return "bi bi-exclamation-circle text-warning";
      default:
        return "bi bi-clock text-muted";
    }
  }

  getDifficultyBadge(difficulty: string) {
    switch (difficulty) {
      case "Easy": return "badge bg-success";
      case "Medium": return "badge bg-warning text-dark";
      case "Hard": return "badge bg-primary";
      case "Expert": return "badge bg-danger";
      default: return "badge bg-secondary";
    }
  }

  onStartTest(testId: string) {
    this.router.navigate(['/students/test', testId]);
  }
}
