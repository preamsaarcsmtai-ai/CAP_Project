// src/app/components/header/header.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  currentUser: User | null = null;
  private userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  toggleSidebar(): void {
    this.toggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
