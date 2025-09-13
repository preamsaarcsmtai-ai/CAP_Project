import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar,Header,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class StudentDashboard {

}
