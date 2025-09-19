// src/app/services/auth.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'superadmin';
  studentId?: string;
  institutionId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadUserFromLocalStorage();
    }
  }

  public loadUserFromLocalStorage(): void {
    if (!this.isBrowser) return;

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(studentId: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        if (this.validateCredentials(studentId, password)) {
          const user: User = {
            id: '1',
            name: this.getUserName(studentId),
            email: this.getUserEmail(studentId),
            role: 'student',
            studentId,
            institutionId: 'inst-001'
          };

          if (this.isBrowser) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          this.currentUserSubject.next(user);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/student-login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private validateCredentials(studentId: string, password: string): boolean {
    return studentId.length >= 5 && password.length >= 6;
  }

  private getUserName(studentId: string): string {
    const mockUsers: { [key: string]: string } = {
      '205': 'Naresh',
      '206': 'jeeva',
      '207': 'Pream'
    };
    return mockUsers[studentId] || 'Student User';
  }

  private getUserEmail(studentId: string): string {
    const name = this.getUserName(studentId).toLowerCase().replace(' ', '.');
    return `${name}@student.edu`;
  }
}
