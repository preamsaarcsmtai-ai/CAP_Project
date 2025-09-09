import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Superadmin } from './superadmin/superadmin';
import { Students } from './pages/students/students';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'superadmin', component: Superadmin },
      { path: '', redirectTo: 'superadmin', pathMatch: 'full' }
    ]
  },
  { path: 'students', component: Students } // Not a child of Layout
];
