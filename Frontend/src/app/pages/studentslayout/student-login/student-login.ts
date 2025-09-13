// src/app/pages/student-login/student-login.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth'; 

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './student-login.html',
  styleUrls: ['./student-login.css']
})
export class StudentLogin {
  studentId = '';
  password = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.studentId && this.password) {
      this.loading = true;
      this.authService.login(this.studentId, this.password).subscribe(success => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/students']);
        } else {
          alert('Invalid student ID or password');
        }
      });
    } else {
      alert('Please enter student ID and password');
    }
  }
}
