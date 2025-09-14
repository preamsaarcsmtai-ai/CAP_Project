import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
@Component({
  selector: 'app-assesments',
  imports: [FormsModule,CommonModule],
  templateUrl: './assesments.html',
  styleUrl: './assesments.css'
})
export class Assesments {

   selectedPhase: string | null = null;

  constructor(private router: Router) { }
testPhases: TestPhase[] = [
    {
      id: "psychometric",
      name: "Psychometric Assessment",
      description: "Personality and behavioral analysis",
      duration: "10 minutes",
      questions: 10,
      icon: "bi-book",
      color: "primary",
      status: "not_started",
      difficulty: "Easy"
    },
    {
      id: "aptitude",
      name: "Aptitude Test",
      description: "Logical reasoning and problem solving",
      duration: "45 minutes",
      questions: 10,
      icon: "bi bi-calculator",
      color: "warning",
      status: "not_started",
      difficulty: "Medium"
    },
    {
      id: "technical",
      name: "Technical MCQ",
      description: "Domain-specific technical knowledge",
      duration: "60 minutes",
      questions: 10,
      icon: "bi bi-code-slash",
      color: "danger",
      status: "in_progress",
      difficulty: "Hard"
    }
  ];

  

  getStatusIcon(status: string) {
    switch (status) {
      case "completed": return "bi-check-circle-fill text-green-600";
      case "in_progress": return "bi-hourglass-split text-yellow-500";
      default: return "bi-circle text-gray-400";
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "not_started": return "Not Started";
      default: return status;
    }
  }

  
  getDifficultyBadge(difficulty: string) {
    switch (difficulty) {
      case "Easy": return "bg-blue-100 text-blue-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      case "Expert": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  }

  onStartTest(testId: string) {
    this.router.navigate(['/test', testId]);
  }
}
