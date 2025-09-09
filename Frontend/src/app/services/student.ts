import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Test, Result, StudentStats } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private testsSubject = new BehaviorSubject<Test[]>([]);
  private resultsSubject = new BehaviorSubject<Result[]>([]);

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockTests: Test[] = [
      {
        id: 1,
        title: 'Career Interests Survey',
        subject: 'Career',
        duration: 30,
        questions: 20,
        difficulty: 'Easy',
        status: 'Available',
        description: 'Identify your interests and suitable career paths'
      },
      {
        id: 2,
        title: 'Skills Assessment',
        subject: 'Career',
        duration: 40,
        questions: 25,
        difficulty: 'Medium',
        status: 'Completed',
        description: 'Evaluate your professional and technical skills'
      },
      {
        id: 3,
        title: 'Personality Insights Test',
        subject: 'Career',
        duration: 35,
        questions: 20,
        difficulty: 'Medium',
        status: 'Available',
        description: 'Understand your personality type and work preferences'
      },
      {
        id: 4,
        title: 'Leadership Potential',
        subject: 'Career',
        duration: 45,
        questions: 25,
        difficulty: 'Hard',
        status: 'In Progress',
        description: 'Assess your leadership and management capabilities'
      },
      {
        id: 5,
        title: 'Time Management Skills',
        subject: 'Career',
        duration: 25,
        questions: 15,
        difficulty: 'Easy',
        status: 'Completed',
        description: 'Measure your efficiency in managing tasks and deadlines'
      }
    ];

    const mockResults: Result[] = [
      {
        id: 1,
        testTitle: 'Skills Assessment',
        subject: 'Career',
        score: 20,
        totalQuestions: 25,
        percentage: 80,
        dateTaken: '2025-09-05',
        timeTaken: 38,
        grade: 'B+'
      },
      {
        id: 2,
        testTitle: 'Time Management Skills',
        subject: 'Career',
        score: 14,
        totalQuestions: 15,
        percentage: 93,
        dateTaken: '2025-09-03',
        timeTaken: 22,
        grade: 'A'
      },
      {
        id: 3,
        testTitle: 'Leadership Potential',
        subject: 'Career',
        score: 21,
        totalQuestions: 25,
        percentage: 84,
        dateTaken: '2025-09-01',
        timeTaken: 42,
        grade: 'B+'
      }
    ];

    this.testsSubject.next(mockTests);
    this.resultsSubject.next(mockResults);
  }

  getTests(): Observable<Test[]> {
    return this.testsSubject.asObservable();
  }

  getResults(): Observable<Result[]> {
    return this.resultsSubject.asObservable();
  }

  getStudentStats(): StudentStats {
    const tests = this.testsSubject.value;
    const results = this.resultsSubject.value;

    return {
      totalTests: tests.length,
      completedTests: tests.filter(t => t.status === 'Completed').length,
      averageScore: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length) : 0,
      pendingTests: tests.filter(t => t.status === 'Available').length
    };
  }
}
