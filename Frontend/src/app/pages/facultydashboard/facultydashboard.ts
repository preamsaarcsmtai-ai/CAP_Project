import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Cohort {
  id: number;
  name: string;
  students: number;
  active: number;
  completed: number;
}

export interface ProctoredSession {
  id: number;
  studentName: string;
  cohort: string;
  exam: string;
  status: 'flagged' | 'completed' | 'in_progress';
  flags: string[];
  startTime: string;
  duration: string;
  severity: 'high' | 'medium' | 'low' | 'none';
}
@Component({
  selector: 'app-facultydashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './facultydashboard.html',
  styleUrl: './facultydashboard.css'
})
export class Facultydashboard {
 title = 'faculty-dashboard';
  activeTab: string = 'overview';
  searchTerm: string = '';
  selectedCohort: string = 'all';
  flagFilter: string = 'all';
  isRefreshing: boolean = false;

  cohorts: Cohort[] = [
    { id: 1, name: 'CS-2024-Spring', students: 45, active: 42, completed: 38 },
    { id: 2, name: 'CS-2024-Fall', students: 52, active: 48, completed: 41 },
    { id: 3, name: 'DS-2024-Spring', students: 38, active: 35, completed: 32 },
    { id: 4, name: 'AI-2024-Summer', students: 29, active: 27, completed: 25 }
  ];

  proctoredSessions: ProctoredSession[] = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      cohort: 'CS-2024-Spring',
      exam: 'Data Structures Final',
      status: 'flagged',
      flags: ['Multiple faces detected', 'Audio anomaly'],
      startTime: '2025-09-13 09:00',
      duration: '2h 15m',
      severity: 'high'
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      cohort: 'CS-2024-Fall',
      exam: 'Algorithms Midterm',
      status: 'flagged',
      flags: ['Eye movement pattern unusual'],
      startTime: '2025-09-13 10:30',
      duration: '1h 45m',
      severity: 'medium'
    },
    {
      id: 3,
      studentName: 'Carol Davis',
      cohort: 'DS-2024-Spring',
      exam: 'Statistics Quiz',
      status: 'completed',
      flags: [],
      startTime: '2025-09-13 11:15',
      duration: '1h 30m',
      severity: 'none'
    },
    {
      id: 4,
      studentName: 'David Wilson',
      cohort: 'AI-2024-Summer',
      exam: 'ML Fundamentals',
      status: 'in_progress',
      flags: ['Browser tab switch detected'],
      startTime: '2025-09-13 14:00',
      duration: '45m',
      severity: 'low'
    },
    {
      id: 5,
      studentName: 'Eva Martinez',
      cohort: 'CS-2024-Spring',
      exam: 'Database Systems',
      status: 'flagged',
      flags: ['Suspicious keyboard activity', 'Multiple audio sources'],
      startTime: '2025-09-13 13:30',
      duration: '1h 50m',
      severity: 'high'
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  get filteredSessions(): ProctoredSession[] {
    return this.proctoredSessions.filter(session => {
      const matchesSearch = session.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           session.exam.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCohort = this.selectedCohort === 'all' || session.cohort === this.selectedCohort;
      const matchesFlag = this.flagFilter === 'all' || 
                         (this.flagFilter === 'flagged' && session.status === 'flagged') ||
                         (this.flagFilter === 'clean' && session.flags.length === 0);
      return matchesSearch && matchesCohort && matchesFlag;
    });
  }

  get stats() {
    return {
      totalSessions: this.proctoredSessions.length,
      flaggedSessions: this.proctoredSessions.filter(s => s.status === 'flagged').length,
      activeSessions: this.proctoredSessions.filter(s => s.status === 'in_progress').length,
      completedSessions: this.proctoredSessions.filter(s => s.status === 'completed').length
    };
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  handleRefresh() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'flagged': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  exportReport() {
    console.log('Exporting report...');
    // Implementation for exporting reports
  }

  viewSessionDetails(sessionId: number) {
    console.log('Viewing details for session:', sessionId);
    // Implementation for viewing session details
  }

  reviewFlags(sessionId: number) {
    console.log('Reviewing flags for session:', sessionId);
    // Implementation for reviewing flags
  }
}
