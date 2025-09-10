import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Question {
  id: number;
  question: string;
  type: string;
  options: string[];
}

interface Test {
  name: string;
  questions: Question[];
}

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-interface.html',
  styleUrls: ['./test-interface.css']
})
export class TestInterface implements OnInit, OnDestroy {
  @Output() onComplete = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();

  testId!: string;
  test!: Test;

  testData: Record<string, Test> = {
    psychometric: {
      name: "Psychometric Assessment",
      questions: [
        {
          id: 1, question: "You prefer to work in teams rather than alone.", type: "likert",
          options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        },
        {
          id: 2, question: "When facing a problem, you usually:", type: "multiple",
          options: ["Think it through carefully", "Ask for help immediately", "Try different solutions", "Look for similar examples"]
        }
      ]
    },
    aptitude: {
      name: "Aptitude Test",
      questions: [
        {
          id: 1, question: "If 5 machines can produce 5 widgets in 5 minutes, how many machines are needed to produce 100 widgets in 100 minutes?", type: "multiple",
          options: ["5", "20", "25", "100"]
        },
        {
          id: 2, question: "What comes next in the sequence: 2, 6, 18, 54, ?", type: "multiple",
          options: ["108", "162", "216", "270"]
        }
      ]
    },
    technical: {
      name: "Technical MCQ",
      questions: [
        {
          id: 1, question: "Which of the following is NOT a fundamental concept in OOP?", type: "multiple",
          options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"]
        },
        {
          id: 2, question: "What is the time complexity of binary search?", type: "multiple",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"]
        }
      ]
    }
  };

  currentQuestion = 0;
  answers: Record<number, string> = {};
  timeRemaining = 1800; // 30 minutes
  timer: any;
  warnings: string[] = [];
  isProctoring = false;
  cameraActive = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // ✅ Get testId from route params
    this.testId = this.route.snapshot.paramMap.get('id')!;
    this.test = this.testData[this.testId];

    if (!this.test) {
      console.error("Invalid testId:", this.testId);
      return;
    }

    this.initializeProctoring();

    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.handleSubmit();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  initializeProctoring(): void {
    this.isProctoring = true;
    this.cameraActive = true;
    setTimeout(() => {
      this.warnings.push("Multiple faces detected");
    }, 10000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  selectAnswer(answer: string, qId: number): void {
    this.answers[qId] = answer;
  }

  nextQuestion(): void {
    if (this.currentQuestion < this.test.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  handleSubmit(): void {
    const results = {
      testId: this.testId,
      answers: this.answers,
      timeSpent: 1800 - this.timeRemaining,
      warnings: this.warnings,
      completedAt: new Date().toISOString()
    };

 
    this.onComplete.emit(results);

    
    this.router.navigate([`/students/results`, this.testId], {
      state: { results }
    });
  }
}
