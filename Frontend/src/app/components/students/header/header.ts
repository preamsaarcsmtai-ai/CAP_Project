// src/app/components/header/header.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // ✅ Optimizes performance
})
export class Header implements OnInit, OnDestroy {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  currentUser: User | null = null;
  private userSubscription?: Subscription;

  // ✅ Dropdown open/close state
  profileMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Subscribe to current user stream
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // ✅ Optional: Close dropdown on outside clicks
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    document.removeEventListener('click', this.handleClickOutside);
  }

  toggleSidebar(): void {
    this.toggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // ✅ Utility to handle dropdown outside clicks
  private handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown') && this.profileMenuOpen) {
      this.profileMenuOpen = false;
    }
  };
}
