import { Component } from '@angular/core';
import { Sidebar } from '../../../components/students/sidebar/sidebar';
import { Header } from '../../../components/students/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar,Header,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class StudentDashboard {

}
