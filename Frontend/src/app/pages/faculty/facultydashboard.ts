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
  studentId?: string;
  cohort: string;
  exam: string;
  status: 'flagged' | 'completed' | 'in_progress';
  flags: string[];
  startTime: string;
  duration: string;
  severity: 'high' | 'medium' | 'low' | 'none';
  timestamp?: Date;
  isOnline?: boolean;
}

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facultydashboard.html',
  styleUrls: ['./facultydashboard.css']
})
export class FacultyDashboardComponent {
  title = 'Faculty Dashboard';

  // UI State
  activeTab = 'overview';
  searchTerm = '';
  selectedCohort = 'all';
  flagFilter = 'all';
  isRefreshing = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Math reference for template
  Math = Math;

  // Data
  cohorts: Cohort[] = [
    { id: 1, name: 'CS-2024-Spring', students: 45, active: 42, completed: 38 },
    { id: 2, name: 'CS-2024-Fall', students: 52, active: 48, completed: 41 },
    { id: 3, name: 'DS-2024-Spring', students: 38, active: 35, completed: 32 },
    { id: 4, name: 'AI-2024-Summer', students: 29, active: 27, completed: 25 }
  ];
proctoredSessions: ProctoredSession[] = [
  {
    id: 1,
    studentName: 'Arun Kumar',
    studentId: 'CS2024001',
    cohort: 'CS-2024-Spring',
    exam: 'Data Structures Final',
    status: 'flagged',
    flags: ['Multiple faces detected', 'Audio anomaly'],
    startTime: '2025-09-13 09:00',
    duration: '2h 15m',
    severity: 'high',
    timestamp: new Date('2025-09-13T09:00:00'),
    isOnline: true
  },
  {
    id: 2,
    studentName: 'Meena Lakshmi',
    studentId: 'CS2024002',
    cohort: 'CS-2024-Fall',
    exam: 'Algorithms Midterm',
    status: 'flagged',
    flags: ['Eye movement pattern unusual'],
    startTime: '2025-09-13 10:30',
    duration: '1h 45m',
    severity: 'medium',
    timestamp: new Date('2025-09-13T10:30:00'),
    isOnline: false
  },
  {
    id: 3,
    studentName: 'Sundar Raj',
    studentId: 'DS2024001',
    cohort: 'DS-2024-Spring',
    exam: 'Statistics Quiz',
    status: 'completed',
    flags: [],
    startTime: '2025-09-13 11:15',
    duration: '1h 30m',
    severity: 'none',
    timestamp: new Date('2025-09-13T11:15:00'),
    isOnline: false
  },
  {
    id: 4,
    studentName: 'Priya Dharshini',
    studentId: 'AI2024001',
    cohort: 'AI-2024-Summer',
    exam: 'ML Fundamentals',
    status: 'in_progress',
    flags: ['Browser tab switch detected'],
    startTime: '2025-09-13 14:00',
    duration: '45m',
    severity: 'low',
    timestamp: new Date('2025-09-13T14:00:00'),
    isOnline: true
  },
  {
    id: 5,
    studentName: 'Karthik Subramani',
    studentId: 'CS2024003',
    cohort: 'CS-2024-Spring',
    exam: 'Database Systems',
    status: 'flagged',
    flags: ['Suspicious keyboard activity', 'Multiple audio sources'],
    startTime: '2025-09-13 13:30',
    duration: '1h 50m',
    severity: 'high',
    timestamp: new Date('2025-09-13T13:30:00'),
    isOnline: true
  },
  {
    id: 6,
    studentName: 'Anitha Ramesh',
    studentId: 'CS2024004',
    cohort: 'CS-2024-Spring',
    exam: 'Software Engineering',
    status: 'completed',
    flags: [],
    startTime: '2025-09-13 15:00',
    duration: '2h 00m',
    severity: 'none',
    timestamp: new Date('2025-09-13T15:00:00'),
    isOnline: false
  },
  {
    id: 7,
    studentName: 'Vignesh Varma',
    studentId: 'DS2024002',
    cohort: 'DS-2024-Spring',
    exam: 'Data Mining',
    status: 'in_progress',
    flags: ['Unusual typing pattern'],
    startTime: '2025-09-13 16:30',
    duration: '1h 20m',
    severity: 'low',
    timestamp: new Date('2025-09-13T16:30:00'),
    isOnline: true
  },
  {
    id: 8,
    studentName: 'Deepa Shanmugam',
    studentId: 'AI2024002',
    cohort: 'AI-2024-Summer',
    exam: 'Neural Networks',
    status: 'flagged',
    flags: ['Screen sharing detected', 'Multiple monitors'],
    startTime: '2025-09-13 12:00',
    duration: '1h 35m',
    severity: 'high',
    timestamp: new Date('2025-09-13T12:00:00'),
    isOnline: true
  }
];

  // --- Getters ---
  get filteredSessions(): ProctoredSession[] {
    let filtered = this.proctoredSessions.filter(session => {
      const matchesSearch =
        session.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        session.exam.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        session.cohort.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (session.studentId && session.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesCohort =
        this.selectedCohort === 'all' || session.cohort === this.selectedCohort;

      const matchesFlag =
        this.flagFilter === 'all' ||
        (this.flagFilter === 'flagged' && session.status === 'flagged') ||
        (this.flagFilter === 'clean' && session.flags.length === 0);

      return matchesSearch && matchesCohort && matchesFlag;
    });

    // Apply sorting if specified
    if (this.sortColumn) {
      filtered = this.sortSessions(filtered, this.sortColumn);
    }

    return filtered;
  }

  get stats() {
    return {
      total: this.proctoredSessions.length,
      flagged: this.proctoredSessions.filter(s => s.status === 'flagged').length,
      active: this.proctoredSessions.filter(s => s.status === 'in_progress').length,
      completed: this.proctoredSessions.filter(s => s.status === 'completed').length
    };
  }

  // --- Core Navigation Methods ---
  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Reset filters when switching tabs
    if (tab !== 'proctoring') {
      this.searchTerm = '';
      this.selectedCohort = 'all';
      this.flagFilter = 'all';
    }
  }

  // --- Data Refresh Methods ---
  handleRefresh() {
    this.isRefreshing = true;
    
    // Simulate API call
    setTimeout(() => {
      // Update timestamps for demo
      this.proctoredSessions.forEach(session => {
        if (session.status === 'in_progress') {
          // Update duration for active sessions
          const start = new Date(session.timestamp || new Date());
          const now = new Date();
          const diffMs = now.getTime() - start.getTime();
          const hours = Math.floor(diffMs / (1000 * 60 * 60));
          const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          session.duration = `${hours}h ${minutes}m`;
        }
      });
      
      this.isRefreshing = false;
      console.log('Dashboard refreshed successfully');
    }, 1500);
  }

  // --- Export Methods ---
  exportReport() {
    console.log('Generating report...');
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalSessions: this.stats.total,
      flaggedSessions: this.stats.flagged,
      activeSessions: this.stats.active,
      completedSessions: this.stats.completed,
      sessions: this.filteredSessions,
      cohorts: this.cohorts
    };

    // Simulate export process
    const jsonData = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `faculty_dashboard_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('Report exported successfully');
  }

  // --- Session Management Methods ---
  viewSessionDetails(sessionId: number) {
    const session = this.proctoredSessions.find(s => s.id === sessionId);
    if (session) {
      console.log(`Viewing details for session: ${sessionId}`, session);
      // TODO: Open modal or navigate to details page
      // For demo, just log the session details
      alert(`Session Details:\n\nStudent: ${session.studentName}\nExam: ${session.exam}\nStatus: ${session.status}\nDuration: ${session.duration}\nFlags: ${session.flags.join(', ') || 'None'}`);
    }
  }

  reviewFlags(sessionId: number) {
    const session = this.proctoredSessions.find(s => s.id === sessionId);
    if (session && session.flags.length > 0) {
      console.log(`Reviewing flags for session: ${sessionId}`, session.flags);
      // TODO: Open flag review modal
      const flagList = session.flags.map((flag, index) => `${index + 1}. ${flag}`).join('\n');
      const action = confirm(`Review Flags for ${session.studentName}:\n\n${flagList}\n\nClick OK to mark as reviewed, Cancel to keep flagged.`);
      
      if (action) {
        // Mark as reviewed (remove flags)
        session.flags = [];
        session.status = 'completed';
        session.severity = 'none';
        console.log('Flags cleared for session:', sessionId);
      }
    }
  }

  // --- Sorting Methods ---
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  private sortSessions(sessions: ProctoredSession[], column: string): ProctoredSession[] {
    return sessions.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (column) {
        case 'student':
          valueA = a.studentName.toLowerCase();
          valueB = b.studentName.toLowerCase();
          break;
        case 'exam':
          valueA = a.exam.toLowerCase();
          valueB = b.exam.toLowerCase();
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'duration':
          valueA = this.parseDuration(a.duration);
          valueB = this.parseDuration(b.duration);
          break;
        case 'flags':
          valueA = a.flags.length;
          valueB = b.flags.length;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  private parseDuration(duration: string): number {
    // Convert duration string like "2h 15m" to minutes
    const parts = duration.match(/(\d+)h?\s*(\d+)?m?/);
    if (parts) {
      const hours = parseInt(parts[1]) || 0;
      const minutes = parseInt(parts[2]) || 0;
      return hours * 60 + minutes;
    }
    return 0;
  }

  // --- UI Helper Methods ---
  getSeverityColor(severity: ProctoredSession['severity']): string {
    const colorMap = {
      high: 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800',
      medium: 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800',
      low: 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800',
      none: 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800'
    };
    return colorMap[severity] || 'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
  }

  getStatusColor(status: ProctoredSession['status']): string {
    const colorMap = {
      flagged: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
      completed: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
      in_progress: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30'
    };
    return colorMap[status] || 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900/30';
  }

  getTabClasses(tabId: string, color: string): string {
    const baseClasses = 'group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-offset-2';
    
    if (this.activeTab === tabId) {
      const activeColorMap: { [key: string]: string } = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105 focus:ring-blue-500/50',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105 focus:ring-purple-500/50',
        red: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105 focus:ring-red-500/50',
        green: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105 focus:ring-green-500/50'
      };
      return `${baseClasses} ${activeColorMap[color]}`;
    } else {
      return `${baseClasses} text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:ring-gray-500/50`;
    }
  }

  // --- Utility Methods ---
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // --- TrackBy Functions for Performance ---
  trackBySessionId(index: number, session: ProctoredSession): number {
    return session.id;
  }

  trackByCohortName(index: number, cohort: Cohort): string {
    return cohort.name;
  }

  trackByCohortId(index: number, cohort: Cohort): number {
    return cohort.id;
  }

  // --- Advanced Filtering Methods ---
  clearAllFilters() {
    this.searchTerm = '';
    this.selectedCohort = 'all';
    this.flagFilter = 'all';
    this.sortColumn = '';
    this.sortDirection = 'asc';
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.searchTerm.trim()) count++;
    if (this.selectedCohort !== 'all') count++;
    if (this.flagFilter !== 'all') count++;
    return count;
  }

  // --- Bulk Actions ---
  bulkReviewFlags(sessionIds: number[]) {
    sessionIds.forEach(id => {
      const session = this.proctoredSessions.find(s => s.id === id);
      if (session && session.flags.length > 0) {
        session.flags = [];
        session.status = 'completed';
        session.severity = 'none';
      }
    });
    console.log(`Bulk reviewed ${sessionIds.length} sessions`);
  }

  // --- Statistics Methods ---
  getCohortStats(cohortName: string) {
    const cohortSessions = this.proctoredSessions.filter(s => s.cohort === cohortName);
    return {
      total: cohortSessions.length,
      flagged: cohortSessions.filter(s => s.status === 'flagged').length,
      completed: cohortSessions.filter(s => s.status === 'completed').length,
      flagRate: cohortSessions.length > 0 ? 
        (cohortSessions.filter(s => s.status === 'flagged').length / cohortSessions.length * 100).toFixed(1) : '0'
    };
  }

  getAverageDuration(): string {
    const completedSessions = this.proctoredSessions.filter(s => s.status === 'completed');
    if (completedSessions.length === 0) return '0m';
    
    const totalMinutes = completedSessions.reduce((sum, session) => {
      return sum + this.parseDuration(session.duration);
    }, 0);
    
    const avgMinutes = Math.round(totalMinutes / completedSessions.length);
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  // --- Keyboard Shortcuts ---
  handleKeyboardShortcut(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) {
      switch (event.key) {
        case 'k':
          event.preventDefault();
          // Focus search input
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
          break;
        case 'r':
          event.preventDefault();
          this.handleRefresh();
          break;
        case 'e':
          event.preventDefault();
          this.exportReport();
          break;
      }
    }
    
    // Tab navigation
    if (!event.metaKey && !event.ctrlKey) {
      const tabs = ['overview', 'cohorts', 'proctoring', 'reports'];
      const currentIndex = tabs.indexOf(this.activeTab);
      
      switch (event.key) {
        case 'ArrowLeft':
          if (event.target === document.body) {
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            this.setActiveTab(tabs[prevIndex]);
          }
          break;
        case 'ArrowRight':
          if (event.target === document.body) {
            event.preventDefault();
            const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            this.setActiveTab(tabs[nextIndex]);
          }
          break;
      }
    }
  }

  // --- Component Lifecycle ---
  ngOnInit() {
    // Add keyboard event listener
    document.addEventListener('keydown', this.handleKeyboardShortcut.bind(this));
    
    // Initialize any required data
    console.log('Faculty Dashboard initialized');
  }

  ngOnDestroy() {
    // Cleanup keyboard event listener
    document.removeEventListener('keydown', this.handleKeyboardShortcut.bind(this));
  }
}