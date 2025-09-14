import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../../services/auth';

interface NavItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit, OnDestroy {
  collapsed = false;
  mobileMenuOpen = false;
  isMobile = false;

  currentUser: User | null = null;
  private userSub?: Subscription;

  mainNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/students', icon: 'bi-house' },
    { title: 'Assessments', url: 'assessments', icon: 'bi-journal-bookmark' },
    { title: 'Results', url: 'results', icon: 'bi-trophy' },
    // { title: 'Analytics', url: '/analytics', icon: 'bi-bar-chart' },
    // { title: 'Schedule', url: '/schedule', icon: 'bi-calendar' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
  }

  ngOnInit(): void {
    // Don't call loadUserFromLocalStorage here (already called in service constructor)
    this.userSub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      console.log('Sidebar currentUser:', user);
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
  }

  private checkScreen(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) this.mobileMenuOpen = false;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
