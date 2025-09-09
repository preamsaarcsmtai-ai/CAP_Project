
// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';
import { TestsComponent } from '../../components/test/test';
import { Results } from '../../components/results/results';
import { Insights } from '../insights/insights';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    Insights,
    TestsComponent,
    Results
  ],
  template: `
    <div>
      <app-navbar 
        [currentPage]="currentPage" 
        (pageChanged)="onPageChanged($event)">
      </app-navbar>
      
      <app-insights *ngIf="currentPage === 'insights'"></app-insights>
      <app-tests *ngIf="currentPage === 'tests'"></app-tests>
      <app-results *ngIf="currentPage === 'results'"></app-results>
    </div>
  `
})
export class Students {
  currentPage: string = 'insights';

  onPageChanged(page: string): void {
    this.currentPage = page;
  }
}
