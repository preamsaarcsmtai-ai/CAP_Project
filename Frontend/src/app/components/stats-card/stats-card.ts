import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card text-white" [ngClass]="'bg-' + color">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h4>{{value}}</h4>
            <p class="mb-0">{{title}}</p>
          </div>
          <div class="align-self-center">
            <i [class]="'fas ' + icon + ' fa-2x'"></i>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = 'fa-chart-line';
  @Input() color: string = 'primary';
}