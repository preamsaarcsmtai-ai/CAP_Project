export interface Test {
  id: number;
  title: string;
  subject: string;
  duration: number;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Available' | 'Completed' | 'In Progress';
  description?: string;
}

export interface Result {
  id: number;
  testTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  dateTaken: string;
  timeTaken: number;
  grade: string;
}

export interface StudentStats {
  totalTests: number;
  completedTests: number;
  averageScore: number;
  pendingTests: number;
}