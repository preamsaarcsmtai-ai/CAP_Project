import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adminusers',
  standalone: true,               // ✅ recommended for standalone component
  imports: [CommonModule],
  templateUrl: './adminusers.html',
  styleUrls: ['./adminusers.css'] // ✅ must be plural
})
export class Adminusers {
  users = [
    { name: 'John Smith', email: 'john.smith@institution.edu', role: 'instructor' },
    { name: 'Mike Wilson', email: 'mike.wilson@institution.edu', role: 'admin' },
    { name: 'Emily Davis', email: 'emily.davis@institution.edu', role: 'student' }
  ];
}
