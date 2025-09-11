import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
viewAdmin=false;
    users = [
    { name: 'John', role: 'Institution Admin', institution: 'MIT College', status: 'active' },
    { name: 'Ganesh', role: 'Institution Admin', institution: 'MMC College', status: 'pending' },
    { name: 'Raj', role: 'Institution Admin', institution: 'SRM College', status: 'suspended' }
  ];

 onView(){
this.viewAdmin=true;
 } 
}
