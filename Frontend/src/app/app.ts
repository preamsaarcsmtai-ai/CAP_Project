import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Superadmin } from './superadmin/superadmin';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet,Superadmin,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smt-cap');
}
