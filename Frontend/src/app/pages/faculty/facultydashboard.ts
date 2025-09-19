import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

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

  // Inject platform to check for browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // UI State
  activeTab = 'overview';
  searchTerm = '';
  selectedCohort = 'all';
  flagFilter = 'all';
  isRefreshing = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  Math = Math; // for template

  cohorts: Cohort[] = [
    { id: 1, name: 'CS-2024-Spring', students: 45, active: 42, completed: 38 },
    { id: 2, name: 'CS-2024-Fall', students: 52, active: 48, completed: 41 },
    { id: 3, name: 'DS-2024-Spring', students: 38, active: 35, completed: 32 },
    { id: 4, name: 'AI-2024-Summer', students: 29, active: 27, completed: 25 }
  ];

proctoredSessions: ProctoredSession[] = [


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

    studentName: 'Priya Ramesh',
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

    studentName: 'Karthik Subramanian',

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

    studentName: 'Meena Lakshmi',

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

    studentName: 'Suresh Balan',
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

    studentName: 'Divya Rajan',

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
=======
    studentName: 'Vigneshwaran',

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

    studentName: 'Anitha Selvaraj',

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
    if (tab !== 'proctoring') {
      this.searchTerm = '';
      this.selectedCohort = 'all';
      this.flagFilter = 'all';
    }
  }

  // --- Data Refresh ---
  handleRefresh() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.proctoredSessions.forEach(session => {
        if (session.status === 'in_progress' && session.timestamp) {
          const start = new Date(session.timestamp);
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
    if (!isPlatformBrowser(this.platformId)) return;

    const reportData = {
      generatedAt: new Date().toISOString(),
      totalSessions: this.stats.total,
      flaggedSessions: this.stats.flagged,
      activeSessions: this.stats.active,
      completedSessions: this.stats.completed,
      sessions: this.filteredSessions,
      cohorts: this.cohorts
    };

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
  }

// ✅ Fix for: getTabClasses is missing
  getTabClasses(tabId: string, color: string): string {
    return this.activeTab === tabId
      ? `px-4 py-2 rounded-lg font-semibold text-white bg-${color}-600`
      : `px-4 py-2 rounded-lg font-semibold text-${color}-600 border border-${color}-600 hover:bg-${color}-50`;
  }

  // ✅ Fix for: trackBySessionId is missing
  trackBySessionId(index: number, session: any): any {
    return session?.id || index;
  }

  // ✅ Fix for: trackByCohortName is missing
  trackByCohortName(index: number, cohort: any): any {
    return cohort?.name || index;
  }


  // --- Session Management ---
  viewSessionDetails(sessionId: number) {
    const session = this.proctoredSessions.find(s => s.id === sessionId);
    if (session && isPlatformBrowser(this.platformId)) {
      alert(`Session Details:\n\nStudent: ${session.studentName}\nExam: ${session.exam}\nStatus: ${session.status}\nDuration: ${session.duration}\nFlags: ${session.flags.join(', ') || 'None'}`);
    }
  }

  reviewFlags(sessionId: number) {
    const session = this.proctoredSessions.find(s => s.id === sessionId);
    if (session && session.flags.length > 0 && isPlatformBrowser(this.platformId)) {
      const flagList = session.flags.map((flag, i) => `${i + 1}. ${flag}`).join('\n');
      const action = confirm(`Review Flags for ${session.studentName}:\n\n${flagList}\n\nClick OK to mark reviewed.`);

      if (action) {
        session.flags = [];
        session.status = 'completed';
        session.severity = 'none';
      }
    }
  }

  // --- Sorting ---
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
      let valueA: any, valueB: any;
      switch (column) {
        case 'student': valueA = a.studentName.toLowerCase(); valueB = b.studentName.toLowerCase(); break;
        case 'exam': valueA = a.exam.toLowerCase(); valueB = b.exam.toLowerCase(); break;
        case 'status': valueA = a.status; valueB = b.status; break;
        case 'duration': valueA = this.parseDuration(a.duration); valueB = this.parseDuration(b.duration); break;
        case 'flags': valueA = a.flags.length; valueB = b.flags.length; break;
        default: return 0;
      }
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private parseDuration(duration: string): number {
    const parts = duration.match(/(\d+)h?\s*(\d+)?m?/);
    if (parts) {
      const h = parseInt(parts[1]) || 0;
      const m = parseInt(parts[2]) || 0;
      return h * 60 + m;
    }
    return 0;
  }

  // --- Colors ---
  getSeverityColor(severity: ProctoredSession['severity']): string {
    const map = {
      high: 'text-red-700 bg-red-50 border-red-200',
      medium: 'text-orange-700 bg-orange-50 border-orange-200',
      low: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      none: 'text-green-700 bg-green-50 border-green-200'
    };
    return map[severity] || 'text-gray-700 bg-gray-50 border-gray-200';
  }

  getStatusColor(status: ProctoredSession['status']): string {
    const map = {
      flagged: 'text-red-700 bg-red-100',
      completed: 'text-green-700 bg-green-100',
      in_progress: 'text-blue-700 bg-blue-100'
    };
    return map[status] || 'text-gray-700 bg-gray-100';
  }

  // --- Utils ---
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  }

  // --- Filters ---
  clearAllFilters() {
    this.searchTerm = '';
    this.selectedCohort = 'all';
    this.flagFilter = 'all';
    this.sortColumn = '';
    this.sortDirection = 'asc';
  }

  getActiveFiltersCount(): number {
    let c = 0;
    if (this.searchTerm.trim()) c++;
    if (this.selectedCohort !== 'all') c++;
    if (this.flagFilter !== 'all') c++;
    return c;
  }

  // --- Bulk ---
  bulkReviewFlags(ids: number[]) {
    ids.forEach(id => {
      const s = this.proctoredSessions.find(x => x.id === id);
      if (s && s.flags.length > 0) {
        s.flags = [];
        s.status = 'completed';
        s.severity = 'none';
      }
    });
  }

  // --- Stats ---
  getCohortStats(name: string) {
    const cohortSessions = this.proctoredSessions.filter(s => s.cohort === name);
    return {
      total: cohortSessions.length,
      flagged: cohortSessions.filter(s => s.status === 'flagged').length,
      completed: cohortSessions.filter(s => s.status === 'completed').length,
      flagRate: cohortSessions.length > 0 ? 
        (cohortSessions.filter(s => s.status === 'flagged').length / cohortSessions.length * 100).toFixed(1) : '0'
    };
  }

  getAverageDuration(): string {
    const completed = this.proctoredSessions.filter(s => s.status === 'completed');
    if (completed.length === 0) return '0m';
    const totalMin = completed.reduce((sum, s) => sum + this.parseDuration(s.duration), 0);
    const avg = Math.round(totalMin / completed.length);
    const h = Math.floor(avg / 60);
    const m = avg % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  // --- Keyboard Shortcuts ---
  private boundKeyHandler = this.handleKeyboardShortcut.bind(this);

  handleKeyboardShortcut(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) {
      switch (event.key) {
        case 'k':
          event.preventDefault();
          if (isPlatformBrowser(this.platformId)) {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
            if (input) { input.focus(); input.select(); }
          }
          break;
        case 'r': event.preventDefault(); this.handleRefresh(); break;
        case 'e': event.preventDefault(); this.exportReport(); break;
      }
    }
    if (!event.metaKey && !event.ctrlKey) {
      const tabs = ['overview', 'cohorts', 'proctoring', 'reports'];
      const idx = tabs.indexOf(this.activeTab);
      if (isPlatformBrowser(this.platformId)) {
        switch (event.key) {
          case 'ArrowLeft':
            if (event.target === document.body) {
              event.preventDefault();
              this.setActiveTab(idx > 0 ? tabs[idx - 1] : tabs[tabs.length - 1]);
            }
            break;
          case 'ArrowRight':
            if (event.target === document.body) {
              event.preventDefault();
              this.setActiveTab(idx < tabs.length - 1 ? tabs[idx + 1] : tabs[0]);
            }
            break;
        }
      }
    }
  }

  // --- Lifecycle ---
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.boundKeyHandler);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.boundKeyHandler);
    }
  }


}
